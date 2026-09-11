<#
  Downloads real, full-colour brand logos into public\logos.

  Why a script: neither the cloud sandbox nor the Linux bridge to this
  machine is allowed out to a CDN, so the download has to happen here.

  Primary source  : Devicon (github.com/devicons/devicon) - full colour.
  Fallback source : Simple Icons (simpleicons.org) - single colour, so the
                    brand's own hex is applied to it.

  Nothing is installed and no package is added. Six files are written.
  Re-run it any time; it overwrites in place.
#>

$ErrorActionPreference = 'Stop'
$ProgressPreference    = 'SilentlyContinue'

$root = Split-Path -Parent $PSScriptRoot
$out  = Join-Path $root 'public\logos'
New-Item -ItemType Directory -Force -Path $out | Out-Null

# out          label            devicon candidates                            simple-icons slug     hex
$tools = @(
  @{ out='figma';        label='Figma';         dev=@('figma/figma-original');                      si='figma';              hex='#F24E1E' },
  @{ out='after-effects';label='After Effects'; dev=@('aftereffects/aftereffects-original',
                                                      'aftereffects/aftereffects-plain');            si='adobeaftereffects';  hex='#9999FF' },
  @{ out='premiere';     label='Premiere Pro';  dev=@('premierepro/premierepro-original',
                                                      'premierepro/premierepro-plain');              si='adobepremierepro';   hex='#9999FF' },
  @{ out='wordpress';    label='WordPress';     dev=@('wordpress/wordpress-original',
                                                      'wordpress/wordpress-plain');                  si='wordpress';          hex='#21759B' },
  @{ out='nextjs';       label='Next.js';       dev=@('nextjs/nextjs-original');                     si='nextdotjs';          hex='#000000' },
  @{ out='react';        label='React';         dev=@('react/react-original');                       si='react';              hex='#61DAFB' }
)

function Get-Url($url) {
  try {
    $r = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 25
    if ($r.StatusCode -eq 200 -and $r.Content -match '<svg') { return [string]$r.Content }
  } catch { }
  return $null
}

Write-Host ''
Write-Host '  Fetching brand logos into public\logos' -ForegroundColor Cyan
Write-Host '  ------------------------------------------------------------'

$ok = 0; $failed = @()

foreach ($t in $tools) {
  $svg = $null; $src = ''

  foreach ($path in $t.dev) {
    $svg = Get-Url "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/$path.svg"
    if ($svg) { $src = 'Devicon, full colour'; break }
  }

  if (-not $svg) {
    $svg = Get-Url ("https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/" + $t.si + ".svg")
    if ($svg) {
      # Simple Icons ship uncoloured, so paint the brand's own hex on.
      $svg = $svg -replace '<svg ', ('<svg fill="' + $t.hex + '" ')
      $src = 'Simple Icons, brand colour applied'
    }
  }

  if ($svg) {
    Set-Content -Path (Join-Path $out ($t.out + '.svg')) -Value $svg -Encoding UTF8 -NoNewline
    Write-Host ('  [ok]   {0,-15} {1}' -f $t.label, $src) -ForegroundColor Green
    $ok++
  } else {
    Write-Host ('  [FAIL] {0,-15} kept the placeholder' -f $t.label) -ForegroundColor Yellow
    $failed += $t.label
  }
}

Write-Host '  ------------------------------------------------------------'
Write-Host ("  $ok of " + $tools.Count + ' downloaded into public\logos') -ForegroundColor Cyan
if ($failed.Count -gt 0) {
  Write-Host ('  Still on placeholders: ' + ($failed -join ', '))
  Write-Host '  Tell Claude which ones failed and it will point at another source.'
}
Write-Host ''
Write-Host '  Refresh the site to see them. If one sits too large or too small'
Write-Host '  in its circle, change its "scale" in content\site\home.ts.'
Write-Host ''
Read-Host '  Press Enter to close'
