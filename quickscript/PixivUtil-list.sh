maindir="/Users/vampiricwulf/Pictures/4chi"
config="/Applications/PixivUtil/config.ini"
cd "$maindir"
echo "Directory set to: $maindir"
echo "Batch list download from list.txt, it will quit on its own on completion."
read -p "Would you like to overwrite old images? (POTENTIALLY LONG PROCESS) [Y/n] " -n 1 -r
if [[ $REPLY =~ ^[Yy]$ ]]; then
 echo
 overString='overwrite = False'
 if grep -q "$overString" "$config"; then
  echo "Swapped to true."
  overtoTrue=true
  sed -i '.tmp' 's/overwrite = False/overwrite = True/g' "$config"
 else
  echo "Already true."
 fi
else
 echo
 overString='overwrite = True'
 if grep -q "$overString" "$config"; then
  echo "Swapped to false."
  overtoFalse=true
  sed -i '.tmp' 's/overwrite = True/overwrite = False/g' "$config"
 else
  echo "Already false."
 fi
 read -p "Would you like to force check all filesizes? (POTENTIALLY LONG PROCESS) [Y/n] " -n 1 -r
 if [[ $REPLY =~ ^[Yy]$ ]]; then
  echo
  checkString='alwayscheckfilesize = False'
  if grep -q "$checkString" "$config"; then
   echo "Swapped to true."
   checktoTrue=true
   sed -i '.tmp' 's/alwayscheckfilesize = False/alwayscheckfilesize = True/g' "$config"
  else
   echo "Already true."
  fi
 else
  echo
  checkString='alwayscheckfilesize = True'
  if grep -q "$checkString" "$config"; then
   echo "Swapped to false."
   checktoFalse=true
   sed -i '.tmp' 's/alwayscheckfilesize = True/alwayscheckfilesize = False/g' "$config"
  else
   echo "Already false."
  fi
 fi
fi
echo "Loading PixivUtil2. Please Wait."
python /Applications/PixivUtil/PixivUtil2.py -s 4 -x
if [[ $overtoTrue ]]; then
 echo "Returning overwrite variable to false."
 sed -i '.tmp' 's/overwrite = True/overwrite = False/g' "$config"
fi
if [[ $overtoFalse ]]; then
 echo "Returning overwrite variable to true."
 sed -i '.tmp' 's/overwrite = False/overwrite = True/g' "$config"
fi
if [[ $checktoTrue ]]; then
 echo "Returning force check variable to false."
 sed -i '.tmp' 's/alwayscheckfilesize = True/alwayscheckfilesize = False/g' "$config"
fi
if [[ $checktoFalse ]]; then
 echo "Returning force check variable to true."
 sed -i '.tmp' 's/alwayscheckfilesize = False/alwayscheckfilesize = True/g' "$config"
fi
[ -e "$config.tmp" ] && rm "$config.tmp"
echo "Please close this Terminal window."
exit 0
