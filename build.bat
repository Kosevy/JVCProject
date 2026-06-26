@echo off
REM Simple build script for JVC Proyecto
REM Copies source to dist and minifies CSS/JS

setlocal

echo Creating dist folder...
if not exist dist mkdir dist

echo Copying files to dist...
xcopy /E /I /H /Y .\* dist\ >nul
REM Remove unnecessary files from dist (optional)
del /F /Q dist\process_images.py >nul 2>nul
del /F /Q dist\README.md >nul 2>nul
del /F /Q dist\REFACTORIZATION_PLAN.md >nul 2>nul
rem Keep only needed? We'll just keep all.

echo Minifying CSS files...
for /R dist\ %%F in (*.css) do (
    powershell -NoProfile -Command "& {
        $css = Get-Content -Raw '%%F';
        $css = $css -replace '/\*.*?\*/', ''; // remove block comments
        $css = $css -replace '//.*?$', ''; // remove line comments
        $css = $css -replace '\s+', ' '; // collapse whitespace
        $css = $css -replace '\s*([\{\}:,;>+~])\s*', '$1'; // trim around symbols
        $css = $css.Trim();
        Set-Content -NoNewline -Path '%%F' -Value $css;
    }"
)

echo Minifying JS files...
for /R dist\ %%F in (*.js) do (
    if /I "%%~nxF" NEQ "bundle.js" (
        powershell -NoProfile -Command "& {
            $js = Get-Content -Raw '%%F';
            $js = $js -replace '/\*.*?\*/', ''; // block comments
            $js = $js -replace '//.*?$', ''; // line comments
            $js = $js -replace '\s+', ' '; // collapse whitespace
            $js = $js -replace '\s*([\{\}:,;=+\-*/%&|^!<>?])\s*', '$1'; // trim around operators
            $js = $js.Trim();
            Set-Content -NoNewline -Path '%%F' -Value $js;
        }"
    )
)

echo Minifying bundle.js...
powershell -NoProfile -Command "& {
    $js = Get-Content -Raw 'dist\js\bundle.js';
    $js = $js -replace '/\*.*?\*/', '';
    $js = $js -replace '//.*?$', '';
    $js = $js -replace '\s+', ' ';
    $js = $js -replace '\s*([\{\}:,;=+\-*/%&|^!<>?])\s*', '$1';
    $js = $js.Trim();
    Set-Content -NoNewline -Path 'dist\js\bundle.js' -Value $js;
}"

echo Build complete. Output is in the dist folder.
endlocal