bring up backend and frontend in docker:    
``` docker-compose up```    
    
production docker:   
uncomment command: npm start in docker-compose.yml   
    
hot reload frontend only   
``` npm run frontend ```   
    
run frontend and backend without docker:    
1. bring up mysql server, change env in .env    
2. ``` npm run dev ```    
