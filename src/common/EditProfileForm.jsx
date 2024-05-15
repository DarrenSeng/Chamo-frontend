import { useState } from 'react';
import cookies from 'js-cookie'

function editProfile(props){
    const user = useSelector(state => state.user)

    const [profile, setProfile] = useState('')
    const userId = props.match.params.userId

    const userVariable = {
        userId: userId
    }
    
}
export function EditProfileForm() {
    const [ authUser, setAuthUser ] = useState(cookies.get('user'));
}

export default EditProfileForm;
