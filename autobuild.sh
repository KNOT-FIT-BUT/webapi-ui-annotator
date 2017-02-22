#watches all project files for change, will make new build if occurs
while true; do
  change=$(inotifywait -r -e close_write,moved_to,create client config libraries public stylesheets templates)
  change=${change#./ * }
  ./build_and_copy
done
