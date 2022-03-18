# Contributing to VueTube
Hello! First of all, I'd like to say thank you for your interest in contributing to the VueTube project. If you haven't already, I'd like to extend to you a warm welcome to our [Discord server](https://discord.gg/7P8KJrdd5W). Hopefully this page will help make the contributing experience as seamless as possible.

# Prerequisites 
- Android Studio "Arctic Fox" or Later - [Download](https://developer.android.com/studio#downloads)
- NodeJS 16.x - [Download](https://nodejs.org/en/download/)
- Java JRE 1.8 - [Download your preferred java runner]
- Java JDK 1.8 - [Download your preferred JDK]
- (Optional) Xcode [iOS app development] - [Download](https://developer.apple.com/xcode/)

# Setup
Now that you have everything installed, you can proceed with installing your node dependencies. You can do this with the following commands in the project's root directory:
`npm i; cd NUXT; npm i; cd ..`

# Testing
If you wish to test the app within your browser, you can enter the `NUXT` directory, and run `npm run dev`. You can then navigate to `http://localhost:80/` in your favorite web browser. 
> NOTE: TESTING THE APPLICATION FROM WITHIN YOUR WEB BROWSER DISALLOWS SOME FEATURES FROM WORKING. PLEASE COMPILE TO YOUR ANDROID DEVICE BEFORE SUBMITTING YOUR PULL REQUEST

> NOTE2: If you get an error about `EACCES: permission denied 0.0.0.0:80`, change the port in `nuxt.config.js` back to 3000.

If you're done with your changes and are ready to submit your code, there is one last step: compiling to your android device. 
- Plug in your Android or iOS device. (and make sure that ADB works for android by running `adb devices` in your ADB directory)
- Then, in the root directory of the project, run `./scripts/build.ps1` on windows or `./scripts/build.sh` for linux or mac.
- Finally, run `npx cap run android` to push to your android device or `npx cap run ios` for your ios device!

# Making a Pull Request
A pull request is fairly simple, and it's done here on GitHub. All we ask is that you include a few screenshots (and/or screen recordings) of what you've actually changed within the app.

# Thanks
We hope that you have had a smooth experience contributing the VueTube. Any additional questions or concerns can be asked on our [Discord server](https://discord.gg/7P8KJrdd5W).
