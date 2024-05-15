import { useState } from 'react';

function editProfile(props){
    const user = useSelector(state => state.user)

    const [profile, setProfile] = useState('')
    const userId = props.match.params.userId

    const userVariable = {
        userId: userId
    }
    
}
export function EditProfileForm() {
    const {bio, setBio} = useContext(AuthContext)
}

export default EditProfileForm;
