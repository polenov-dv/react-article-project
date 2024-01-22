import "./styles/index.scss"
import { AppRouter } from 'providers/AppRouter';
import { AuthorizationProvider } from 'providers/AuthorizationProvider';

const App = () => {
	return (
		<div className='app'>
			<AuthorizationProvider>
				<AppRouter />
			</AuthorizationProvider>
		</div>
	);
};

export default App;