# checkout as bot
git config user.name "ucanbot"
git config user.email "9mbs.ucan.bot@gmail.com"

git add .
git commit -m "[content/bot] - file renamed"

echo "[INFO] Commited as bot"

# checkout back to user
git config user.name "9mbs"
git config user.email "6matbub@gmail.com"