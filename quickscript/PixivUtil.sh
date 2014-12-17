maindir="/Users/vampiricwulf/Pictures/4chi"
echo -e "Directory to download into: $maindir/\c "
read dir
newdir="$maindir/$dir"
if [ -d "$newdir" ]; then
  cd "$newdir"
else
  read -p "Invalid Directory. Would you like to make this directory? [Y/n] " -n 1 -r
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    cd "$maindir"
    mkdir -p "$dir"
  else
    echo
    read -p "Would you like to continue? Directory defaults to: $maindir [Y/n] " -n 1 -r
    if ! [[ $REPLY =~ ^[Yy]$ ]]; then
      echo
      echo "Please close this Terminal window."
      exit 0
    fi
    newdir="$maindir"
  fi
  cd "$newdir"
  echo
fi
echo "Directory set to: $newdir"
echo "Loading PixivUtil2. Please Wait."
python /Applications/PixivUtil/PixivUtil2.py
echo "Please close this Terminal window."
exit 0
