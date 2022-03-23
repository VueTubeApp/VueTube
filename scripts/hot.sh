function hot {
  if (( $# < 2 )); then
    echo 'USAGE: hot <command> <file1> [<file2> ... <fileN>]'
    echo '<command> will be run once when any of the files listed is changed (i.e. ls -l <file> has its output changed)'
  else
    script=$1
    shift
    a='';
    while true; do
      echo "checking $1"
      b=`ls -lahR $* | grep -v 'node_modules'`
      # to avoid confusing myself with nested-if - it is a "short form" of doing a=$b; eval $script if $a != $b.
      [[ $a != $b ]] && a=$b && eval $script;
      sleep .5;
    done
  fi
}

# NOTE: run from the root of the project
# ./scripts/watcher.sh init NUXT
hot ./scripts/build.sh NUXT
