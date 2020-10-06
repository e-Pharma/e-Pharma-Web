export author="BLasan"

git ls-files | while read f; do replaceEscaped=$(sed 's/[&/\]/\\&/g' <<<"$f"); git blame 
-w --line-porcelain -- "$f" | grep -I '^author ' \| sed s/^/"$replaceEscaped"" "/; done | grep "$author" | awk '{print $1}' | sort -f | 
uniq -ic | sort -n


