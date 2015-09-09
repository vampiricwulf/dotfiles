$maindir = "E:\4chi"
$dir = Read-Host "Directory to download into: $maindir\"
$newdir = "$maindir\$dir"
if (Test-Path $newdir) {
  cd "$newdir"
} else  {
  $baddir = "Invalid Directory."
  $message = "Pick your action:"
  $makedir = New-Object System.Management.Automation.Host.ChoiceDescription "&Make Directory", "Make Directory"
  $origdir = New-Object System.Management.Automation.Host.ChoiceDescription "&Revert to Main Directory", "Revert to Main Directory"
  $cancel = New-Object System.Management.Automation.Host.ChoiceDescription "&Cancel", "Cancel"
  $options = [System.Management.Automation.Host.ChoiceDescription[]]($makedir, $origdir, $cancel)
  $result = $host.ui.PromptForChoice($baddir, $message, $options, 2)
  switch ($result) {
    0 {
      cd "$maindir"
      mkdir -p "$dir"
    }
    1 {
      $newdir = "$maindir"
    }
    2 {
      exit 0
    }
  }
  cd "$newdir"
  echo
}
echo "Directory set to: $newdir"
echo "Loading PixivUtil2. Please Wait."
C:\PixivUtil\PixivUtil2.exe
echo "Please close this Terminal window."
exit 0
