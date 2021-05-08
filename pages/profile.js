import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { useAuth, withAuth } from '../lib/firebase/auth';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from "axios";
import FirebaseUpload from "../components/FirebaseUpload";

function Profile() {
  const { auth, user, refreshUser } = useAuth();
  const router = useRouter();

  const [ fullname, setFullname ] = useState(null);
  const [ username, setUsername ] = useState(null);
  const [ birthday, setBirthday ] = useState("2017-05-24");
  const [ maxAge, setMaxAge ] = useState(100);
  const [ email, setEmail] = useState(auth?.email || null);
  const [ about, setAbout ] = useState(null);
  const [ avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (user) router.push(`/${user.username}/edit`);

    setEmail(auth?.email);
  }, [auth, user]);

  function submit(){
    const payload = {
      username: username,
      user: {
        fullname: fullname,
        birthday: birthday,
        maxAge: maxAge,
        email: email,
        about: about,
        avatar: avatar
      }
    }
    axios.post("/api/user", payload).then(( res ) => {
      if (res.status == 200) {
        refreshUser(auth).then((res) => {
          router.push(`/${username}/edit`);
        }).catch((error) => {
          router.push(`/404`);
        })
      }
    }).catch(( error ) => {
      console.log("Recheck your form bitch: ", error);
    })
  }

  return (
    <>
      <form className="" noValidate autoComplete="off" className="flex flex-col mt-40">
        <TextField id="profile-fullname" 
          label="Full name" 
          variant="outlined" 
          onChange={(e) => setFullname(e.target.value)}
          required/>

        <TextField id="profile-username" 
          onChange={(e) => setUsername(e.target.value)}
          label="Username" 
          variant="outlined" 
          required/>

        <TextField id="profile-birthday" 
          onChange={(e) => setBirthday(e.target.value)}
          label="Birthday" 
          variant="outlined" 
          type="date"
          InputLabelProps={{shrink: true}}
          required/>

        <TextField id="profile-maxage" 
          onChange={(e) => setMaxAge(e.target.value)}
          label="MaxAge" 
          variant="outlined" 
          type="number" 
          value={maxAge}
          required/>

        <TextField id="profile-email" 
          label="Email" 
          disabled
          variant="outlined"           
          value={auth.email}
          InputProps={{ readOnly: true}}
        />

        <TextField id="profile-about" 
          onChange={(e) => setAbout(e.target.value)}
          label="About your sefl" 
          multiline
          variant="outlined" />

        <FirebaseUpload id="profile-avatar" onComplete={(path, url) => {(path, url) => setAvatar(path)}} prefix={username}  className="bg-black"/>

        <Button id="profile-submit" variant="outlined" color="primary" onClick={submit}>
          Submit
        </Button>
      </form>
    </>
  )
}

export default withAuth(Profile, false, "/login");
