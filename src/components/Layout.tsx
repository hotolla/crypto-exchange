import { Footer } from './Footer';
import { Header } from './Header/Header';

export const Layout = ({ children, isDarkTheme, onThemeToggle}: any) => {
	return (
		<>
			<Header isDarkTheme={isDarkTheme} onThemeToggle={onThemeToggle}/>
				{children}
			<Footer />
		</>
	);
};