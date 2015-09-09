$maindir = "E:\4chi"
$config="C:\PixivUtil\config.ini"
cd "$maindir"
echo "Directory set to: $maindir"
$title = "Batch list download from list.txt, it will quit on its own on completion."
$message = "Pick your action:"
$overString = New-Object System.Management.Automation.Host.ChoiceDescription "&Overwrite Old Images", "Overwrite old images. (POTENTIALLY LONG PROCESS)"
$checkString = New-Object System.Management.Automation.Host.ChoiceDescription "&Check Filesizes", "Force check all filesizes. (POTENTIALLY LONG PROCESS)"
$neither = New-Object System.Management.Automation.Host.ChoiceDescription "&Neither", "Neither"
$options = [System.Management.Automation.Host.ChoiceDescription[]]($overString, $checkString, $neither)
$result = $host.ui.PromptForChoice($title, $message, $options, 2)
switch ($result) {
  0 {
    $overwrite = 'overwrite = False'
    if ($(grep "$overwrite" "$config") -ne $null) {
     echo "Swapped to true."
     $overtoTrue = true
     sed -i '.tmp' 's/overwrite = False/overwrite = True/g' "$config"
    } else {
     echo "Already true."
   }
  }
  1 {
    $checksum = 'alwayscheckfilesize = False'
    if ($(grep "$checksum" "$config") -ne $null) {
     echo "Swapped to true."
     $checktoTrue = true
     sed -i '.tmp' 's/alwayscheckfilesize = False/alwayscheckfilesize = True/g' "$config"
    } else {
     echo "Already true."
    }
  }
  2 {
    $overwrite = 'overwrite = True'
    if ($(grep "$overwrite" "$config") -ne $null) {
     echo "Swapped to false."
     $overtoFalse = true
     sed -i '.tmp' 's/overwrite = True/overwrite = False/g' "$config"
    } else {
     echo "Overwrite already false."
   }
    $checksum = 'alwayscheckfilesize = True'
    if ($(grep "$checksum" "$config") -ne $null) {
     echo "Swapped to false."
     $checktoFalse = true
     sed -i '.tmp' 's/alwayscheckfilesize = True/alwayscheckfilesize = False/g' "$config"
    } else {
     echo "Check file size already false."
    }
  }
}
echo "Loading PixivUtil2. Please Wait."
C:\PixivUtil\PixivUtil2.exe -s 4 -x
if ($overtoTrue) {
 echo "Returning overwrite variable to false."
 sed -i '.tmp' 's/overwrite = True/overwrite = False/g' "$config"
}
if ($checktoTrue) {
 echo "Returning force check variable to false."
 sed -i '.tmp' 's/alwayscheckfilesize = True/alwayscheckfilesize = False/g' "$config"
}
if ($overtoFalse) {
 echo "Returning overwrite variable to true."
 sed -i '.tmp' 's/overwrite = False/overwrite = True/g' "$config"
}
if ($checktoFalse) {
 echo "Returning force check variable to true."
 sed -i '.tmp' 's/alwayscheckfilesize = False/alwayscheckfilesize = True/g' "$config"
}
if (Test-Path "$config.tmp") {
  rm "$config.tmp"
}
echo "Please close this Terminal window."
exit 0
