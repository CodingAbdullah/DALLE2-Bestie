# OpenAI Image Generator Site
#### _Create, Store and Retrieve AI Generated Images_

<br>

The creators of ChatGPT, they've released their beta version of the API responsible for the many slick things AI can do. **Create, store and retrieve AI generated images with this site**. 

All the source code for creating the site from the ground up, front to back, can be found here. For further documentation, please refer to the relevant section on technologies used.

The future is now and the possibilities are endless.
<br>
<br>


#### `The Process`
- Type what you desire as a search
- Size of the image you desire (small/medium/large, the only options supported in beta version)
- And then... viola! The miracle happens ;)
- Don't thank me for it, I'm just a mere developer, AI is yo bosss
<br>

#### `Additional Features`

- User signin/login/logout supported
- Security enhanced using salting/hashing passwords
- Important routes are protected through JWT tokens and are verified to check if they  are valid
- Searching and saving images to database supported
- Fetching past images supported
- Validating appropriate emails to be registered to database
- Forgot password feature enabled (**only for GMAIL accounts**) using **Nodemailer**
- Verification codes for verifying password resets are provided by **UUID.V4**
<br>

#### `Tech`

The site uses several technologies and tools. As the project completes, more will be added to this section :

- [**OpenAI**] - API services are provided by them, validated through the use of keys
- [**NodeJS**] - Back-end developement, spinning up that Node server for communication
- [**ExpressJS**] - A minified framework for backend developement, used for creating controllers, interacting with our model and routes
- [**ReactJS**] - UI library for creating our front-end pages/components, using the latest features
- [**Redux/Redux Toolkit]** - Create a state container for global state monitoring/maintaining
- [**Bootstrap**] - CSS framework for ready-made components
- [**MongoDB Atlas**] - A cloud based (AWS) Non-Relational Database storage holding our data
- [**GIT**] - For project version control
- [**AWS**] - AWS services will/were used for deploying project (AWS Amplify, EC2, Route 53, etc.)
- [**Namecheap**] - Domain purchasing
<br>

#### `Javascript Libraries/Dependencies`
For both frontend/backend development of this project, the following libraries were incorporated. Without which, the development of this site would not be possible.

- **axios**
- **bcryptjs**
- **cors**
- **dotenv**
- **express**
- **jsonwebtoken**
- **mongodb**
- **mongoose**
- **nodemailer**
- **OpenAI - DALL·E 2**
- **uuid**
- **react**
- **redux/toolkit**
- **react-router**
- **validator**
<br>

#### `License`

MIT
