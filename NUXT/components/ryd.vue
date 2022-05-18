<template>
  <div class="ryd">
    <div class="ryd__container">
      <div class="ryd__content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    apiUrl: "https://returnyoutubedislikeapi.com",
    storedData: {
      likes: 0,
      dislikes: 0,
      previousState: "NEUTRAL_STATE",
    },
  }),
  methods: {
    async solvePuzzle(puzzle) {
      let challenge = Uint8Array.from(atob(puzzle.challenge), (c) =>
        c.charCodeAt(0)
      );
      let buffer = new ArrayBuffer(20);
      let uInt8View = new Uint8Array(buffer);
      let uInt32View = new Uint32Array(buffer);
      let maxCount = Math.pow(2, puzzle.difficulty) * 3;
      for (let i = 4; i < 20; i++) {
        uInt8View[i] = challenge[i - 4];
      }

      for (let i = 0; i < maxCount; i++) {
        uInt32View[0] = i;
        let hash = await crypto.subtle.digest("SHA-512", buffer);
        let hashUint8 = new Uint8Array(hash);
        if (countLeadingZeroes(hashUint8) >= puzzle.difficulty) {
          return {
            solution: btoa(
              String.fromCharCode.apply(null, uInt8View.slice(0, 4))
            ),
          };
        }
      }
      return {};
    },
    generateUserID(length = 36) {
      const charset =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let result = "";
      if (crypto && crypto.getRandomValues) {
        const values = new Uint32Array(length);
        crypto.getRandomValues(values);
        for (let i = 0; i < length; i++) {
          result += charset[values[i] % charset.length];
        }
        return result;
      } else {
        for (let i = 0; i < length; i++) {
          result += charset[Math.floor(Math.random() * charset.length)];
        }
        return result;
      }
    },

    storageChangeHandler(changes, area) {
      if (changes.disableVoteSubmission !== undefined) {
        handleDisableVoteSubmissionChangeEvent(
          changes.disableVoteSubmission.newValue
        );
      }
      if (changes.coloredThumbs !== undefined) {
        handleColoredThumbsChangeEvent(changes.coloredThumbs.newValue);
      }
      if (changes.coloredBar !== undefined) {
        handleColoredBarChangeEvent(changes.coloredBar.newValue);
      }
      if (changes.colorTheme !== undefined) {
        handleColorThemeChangeEvent(changes.colorTheme.newValue);
      }
      if (changes.numberDisplayRoundDown !== undefined) {
        handleNumberDisplayRoundDownChangeEvent(
          changes.numberDisplayRoundDown.newValue
        );
      }
      if (changes.numberDisplayFormat !== undefined) {
        handleNumberDisplayFormatChangeEvent(
          changes.numberDisplayFormat.newValue
        );
      }
      if (changes.numberDisplayReformatLikes !== undefined) {
        handleNumberDisplayReformatLikesChangeEvent(
          changes.numberDisplayReformatLikes.newValue
        );
      }
    },

    async sendVote(videoId, vote) {
      api.storage.sync.get(null, async (storageResult) => {
        if (!storageResult.userId || !storageResult.registrationConfirmed) {
          await this.register();
        }
        let voteResponse = await fetch(`${apiUrl}/interact/vote`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: storageResult.userId,
            videoId,
            value: vote,
          }),
        });

        if (voteResponse.status == 401) {
          await this.register();
          await this.sendVote(videoId, vote);
          return;
        }
        const voteResponseJson = await voteResponse.json();
        const solvedPuzzle = await this.solvePuzzle(voteResponseJson);
        if (!solvedPuzzle.solution) {
          await this.sendVote(videoId, vote);
          return;
        }

        await fetch(`${apiUrl}/interact/confirmVote`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...solvedPuzzle,
            userId: storageResult.userId,
            videoId,
          }),
        });
      });
    },

    async register() {
      const userId = this.generateUserID();
      api.storage.sync.set({ userId });
      const registrationResponse = await fetch(
        `${apiUrl}/puzzle/registration?userId=${userId}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      ).then((response) => response.json());
      const solvedPuzzle = await this.solvePuzzle(registrationResponse);
      if (!solvedPuzzle.solution) {
        await this.register();
        return;
      }
      const result = await fetch(
        `${apiUrl}/puzzle/registration?userId=${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(solvedPuzzle),
        }
      ).then((response) => response.json());
      if (result === true) {
        return api.storage.sync.set({ registrationConfirmed: true });
      }
    },
    like() {
      if (checkForSignInButton() === false) {
        if (this.storedData.previousState === "DISLIKED_STATE") {
          sendVote(1);
          if (this.storedData.dislikes > 0) this.storedData.dislikes--;
          this.storedData.likes++;
          createRateBar(this.storedData.likes, this.storedData.dislikes);
          setDislikes(numberFormat(this.storedData.dislikes));
          this.storedData.previousState = "LIKED_STATE";
        } else if (this.storedData.previousState === "NEUTRAL_STATE") {
          sendVote(1);
          this.storedData.likes++;
          createRateBar(this.storedData.likes, this.storedData.dislikes);
          this.storedData.previousState = "LIKED_STATE";
        } else if ((this.storedData.previousState = "LIKED_STATE")) {
          sendVote(0);
          if (this.storedData.likes > 0) this.storedData.likes--;
          createRateBar(this.storedData.likes, this.storedData.dislikes);
          this.storedData.previousState = "NEUTRAL_STATE";
        }
      }
    },
    dislike() {
      if (checkForSignInButton() == false) {
        if (this.storedData.previousState === "NEUTRAL_STATE") {
          sendVote(-1);
          this.storedData.dislikes++;
          setDislikes(numberFormat(this.storedData.dislikes));
          createRateBar(this.storedData.likes, this.storedData.dislikes);
          this.storedData.previousState = "DISLIKED_STATE";
        } else if (this.storedData.previousState === "DISLIKED_STATE") {
          sendVote(0);
          if (this.storedData.dislikes > 0) this.storedData.dislikes--;
          setDislikes(numberFormat(this.storedData.dislikes));
          createRateBar(this.storedData.likes, this.storedData.dislikes);
          this.storedData.previousState = "NEUTRAL_STATE";
        } else if (this.storedData.previousState === "LIKED_STATE") {
          sendVote(-1);
          if (this.storedData.likes > 0) this.storedData.likes--;
          this.storedData.dislikes++;
          setDislikes(numberFormat(this.storedData.dislikes));
          createRateBar(this.storedData.likes, this.storedData.dislikes);
          this.storedData.previousState = "DISLIKED_STATE";
        }
      }
    },
  },
};
</script>
