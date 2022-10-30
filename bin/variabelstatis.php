<?php

function gravitasi () {
  $g = 9.8;

  echo "gravitasi: {$g} <br>";
  $g++;
}

gravitasi(); /*definisi pertama*/
gravitasi(); /*definisi kedua akan berniai sama dengan definisi fungsi pertama*/
?>