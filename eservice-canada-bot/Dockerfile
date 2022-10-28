FROM public.ecr.aws/lambda/nodejs:16

COPY package.json ./

RUN npm install --omit=dev

COPY . ./

# Command can be overwritten by providing a different command in the template directly.
CMD ["app.lambdaHandler"]
