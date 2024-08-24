import { useSelector, useDispatch } from 'react-redux'
import { setUser, initialState } from 'store/auth/userSlice'
import { apiSignIn, apiSignInManager, apiSignOut } from 'services/AuthService'
import { onSignInSuccess, onSignOutSuccess, setPermissions } from 'store/auth/sessionSlice'
import appConfig from 'configs/app.config'
import { REDIRECT_URL_KEY } from 'constants/app.constant'
import { useNavigate } from 'react-router-dom'
import useQuery from './useQuery'

function useAuth() {
	const { role } = useSelector((state) => state.base.common)
	const dispatch = useDispatch()

	const navigate = useNavigate()

	const query = useQuery()

	const { token, signedIn } = useSelector((state) => state.auth.session)

	const signIn = async ({ login, password }) => {
		console.log({ login, password });
		console.log(role);
		if (role === "superadmin") {

			try {
				const resp = await apiSignIn({ login, password })
				console.log(resp);

				if (resp.data) {

					const { token } = resp.data
					console.log(token);
					dispatch(onSignInSuccess(token))
					dispatch(setPermissions(["admin", resp.data.role]))
					localStorage.setItem("permissions", JSON.stringify(["admin", resp.data.role]))
					dispatch(setUser({ userName: resp.data.full_name, authority: resp.data.role === "menejer" ? ["MANAGER"] : resp.data.role === "superadmin" ? ["SUPERADMIN"] : ["USER"] } || {
						avatar: '',
						userName: 'Anonymous',
						authority: ['USER'],
						email: ''
					}))
					const redirectUrl = query.get(REDIRECT_URL_KEY)
					navigate(redirectUrl ? redirectUrl : appConfig().authenticatedEntryPath)
					return {
						status: 'success',
						message: ''
					}
				}
			} catch (errors) {
				return {
					status: 'failed',
					message: errors?.response?.data?.message || errors.toString()
				}
			}
		} else if (role === "manager") {
			try {
				const resp = await apiSignInManager({ login, password })
				console.log(resp);

				if (resp.data) {

					const { token } = resp.data
					console.log(token);
					dispatch(onSignInSuccess(token))
					dispatch(setPermissions(["admin", resp.data.role]))
					localStorage.setItem("permissions", JSON.stringify(["admin", resp.data.role]))
					dispatch(setUser({ userName: resp.data.full_name, authority: resp.data.role === "menejer" ? ["MANAGER"] : resp.data.role === "superadmin" ? ["SUPERADMIN"] : ["USER"] } || {
						avatar: '',
						userName: 'Anonymous',
						authority: ['USER'],
						email: ''
					}))
					const redirectUrl = query.get(REDIRECT_URL_KEY)
					navigate(redirectUrl ? redirectUrl : appConfig().authenticatedEntryPath)
					return {
						status: 'success',
						message: ''
					}
				}
			} catch (errors) {
				return {
					status: 'failed',
					message: errors?.response?.data?.message || errors.toString()
				}
			}
		}
	}

	const handleSignOut = () => {
		dispatch(onSignOutSuccess())
		dispatch(setUser(initialState))
		navigate(appConfig().unAuthenticatedEntryPath)
	}

	const signOut = async () => {
		try {
			localStorage.removeItem("prefix")
			await apiSignOut()
			handleSignOut()
		} catch (errors) {
			handleSignOut()
		}
	}

	return {
		authenticated: token && signedIn,
		signIn,
		signOut
	}
}

export default useAuth