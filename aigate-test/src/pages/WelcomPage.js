import classes from './WelcomPage.module.scss';

const WelcomePage = () => {
    return (
        <div className={classes.welcome}>
            <p className={classes['heading-primary']}>Welcome To AI-Gate</p>
        </div>
    );
}


export default WelcomePage;