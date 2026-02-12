How to set up authentik
1. run docker compose up -d
2. bun run dev
3. in your browser open localhost:80/if/flow/initial-setup/  
4. Sign up using the following data
  email: it-komiteen@studenterforpalestina.no 
  password: 123456
5. Click on create a new application
6. Fill in the following data

Provider Name: sfp-admin
Client type: public
Client ID: H05hj25LtVS2HevWxT0Imfk0nABd7phiWSHBvnNo
Redirect URIs/Origins: http://localhost:3000/callback 
