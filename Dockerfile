FROM node:5.10.1

COPY package.json package.json  
RUN npm install

# Add your source files
COPY . .  
CMD ["npm","start"] 
