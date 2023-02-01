# OpenAI Image Generator Site
#### _Create, Store and Retrieve AI Generated Images_


OpenAI had recently released their beta version on the many exciting things AI has in store. The creators of ChatGPT, they've released their beta version of the API responsible for the many slick things AI can do. **Create, store and retrieve AI generated images with this site**. 

All the source code for creating the site from the ground up, front to back, can be found here. For further documentation, please refer to the relevant section on technologies used.

The future is now and the possibilities are endless.

`The Process`
- Type what you desire as a search
- Size of the image you desire (small/medium/large, the only options supported in beta version)
- And then... viola! The miracle happens ;)
- Don't thank me for it, I'm just a mere developer, AI is yo bosss

## Additional Features

- User signin/login/logout supported
- Security enhanced using salting/hashing passwords
- Important routes are protected through JWT tokens and are verified to check if they  are valid
- Searching and saving images to database supported
- Fetching past images supported
- Validating appropriate emails to be registered to database
- Forgot password feature enabled (**only for GMAIL accounts**) using **Nodemailer**
- Verification codes for verifying password resets are provided by **UUID.V4**


## License

MIT