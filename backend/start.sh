npm run start:dev &
sleep 160
npm run db:migrate &
sleep 60
npm run db:seed
tail -f /dev/null