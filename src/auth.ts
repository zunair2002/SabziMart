import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import connectDB from "./config/db"
import User from "./models/usermodel";
import bcrypt from "bcryptjs";
import Google from "next-auth/providers/google";
// proper authentication kr rhy using nextauth
 
export const { handlers, signIn, signOut, auth } = NextAuth({
// google,github,own credentionals
  providers: [
    Credentials({
        credentials: {
        email: { label: "email" , type: "email" },
        password: { label: "Password", type: "password" },
        },

        //alaways return user object
        async authorize(credentials,req){
                await connectDB();
                const email =  credentials.email
                const password = credentials.password as string
                const user = await User.findOne({email})
                if(!user){
                    throw new Error('user does not exist')
                }

                const passmatching = await bcrypt.compare(password,user.password)
                if(!passmatching){
                    throw new Error('wrong password try again!')
                }
                return{
                    id:user._id.toString(),
                    email:user.email,
                    name:user.name
                }
        }
    }),
    Google({
      clientId:process.env.CLIENT_ID,
      clientSecret:process.env.CLIENT_SECRET
      
    })
  ],
//data ko token may dalna then token ko session may
  
callbacks:{
//google sy sign in ya password bi dyta + image bi
    async signIn({user,account}){
      if(account?.provider=="google"){
      await connectDB()
      let userdata = await User.findOne({email:user.email})
      if(!userdata){
        userdata = await User.create({
          name:user.name,
          email:user.email,
          image:user.image,
        //is kay ilawa wo id + role bi tu return kry ga

        })
      }
      user.id=userdata._id.toString()
      user.role=userdata.role
      }
      return true;
    },
    //always rtuen token
    jwt({token,user}) {
        if(user){
            token.id = user.id,
            token.name = user.name,
            token.email = user.email,
            token.role = user.role
        }
        return token
    },
    session({session,token}){
        if(session.user){
            session.user.id=token.id as string
            session.user.name=token.name as string
            session.user.email=token.email as string
            session.user.role=token.role as string
        }
        return session
    }
  },
//kis page pr redirect krna after signin
  pages:{
    signIn:'/login',
    error:'/login'
  },
//kis type ka session bhnana (jwt)
  session:{
    strategy:"jwt",
    maxAge:10*24*60*60
  },
  secret:process.env.AUTH_SECRET
})

// User api/auth/signin -> provider(google,github,own credentionals) -> JWT ->session create ->frontend(unsession)

//connectDB
//email check
//password match