npm run start:dev &
sleep 90
npm run db:seed
tail -f /dev/null