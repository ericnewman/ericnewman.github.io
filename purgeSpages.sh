#!/bin/bash

# Usage: ./purgeSpages "spages.mobileposse.com" "30d"
echo $1 $2
s3cmd ls s3://$1 | grep " DIR " -v | while read -r line;
  do
    createDate=`echo $line|awk {'print $1" "$2'}`
    createDate=`date -j -f "%Y-%m-%d %H:%M" "$createDate" +%s`
    olderThan=`date -j -v-$2 +%s`
    fileName=`echo $line|awk {'print $4'}`
    if [[ $createDate -lt $olderThan ]]
      then
        if [[ $fileName != "" ]]
          then
            printf 'Deleting "%s"\n' $fileName
            s3cmd del "$fileName"
        fi
    else
       printf 'Not Deleting "%s"\n' $fileName
    fi
  done;
