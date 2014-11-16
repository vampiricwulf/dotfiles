echo -e "Directory to download into: /Users/vampiricwulf/Pictures/4chi/\c "
read dir
newdir="/Users/vampiricwulf/Pictures/4chi/$dir"
if [ -d "$newdir" ]; then
    cd "$newdir"
else
    read -p "Invalid Directory. Would you like to make this directory? " -n 1 -r
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        cd "/Users/vampiricwulf/Pictures/4chi" 
        mkdir -p "$dir"
        cd "./$dir"
    else
        cd "/Users/vampiricwulf/Pictures/4chi"
    fi
    echo
fi
echo "Directory set to: $newdir"
echo "Loading PixivUtil2. Please Wait."
python /Applications/PixivUtil/PixivUtil2.py 
echo "Please close this Terminal window as a typing bug tends to occur after PixivUtil exits."
exit 0
