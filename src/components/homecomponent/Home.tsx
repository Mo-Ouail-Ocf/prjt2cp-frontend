import Logo from "../../images/logo.svg"; // Assuming 'images' folder exists
import Lampe from "../../images/lampe.png";
import Cahier from "../../images/cahier-crayon.png";
import Card1 from "../../images/card1.png";
import Card2 from "../../images/card2.png";
import Card3 from "../../images/card3.png";
import Card4 from "../../images/card4.png";
import Homme from "../../images/homme.jpg";
import Cerveau from "../../images/cerveau.jpg";
import Brainstorming from "../../images/brainstorming.png";
import styles from "./home.module.css";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <div className={styles.logo}>
            <img src={Logo} alt="Company Logo" className={styles.logo} />
          </div>
          <div className={styles.divfeatures}>
            <Link className={styles.features} to="../features">
              Features
            </Link>
            <Link className={styles.help} to="../help">
              Help Center
            </Link>
            <Link className={styles.aboutUs} to="../about">
              About Us
            </Link>
          </div>
          <div className={styles.divlogin}>
            <Link className={styles.login} to="../login">
              Login
            </Link>
            <Link className={styles.signup} to="../login">
              <button className={styles.signup}>Sign Up</button>
            </Link>
          </div>
        </nav>
      </header>
      {/*************************************************************************************************** */}
      {/*************************************************************************************************** */}
      {/*************************************************************************************************** */}
      {/*************************************************************************************************** */}
      {/*************************************************************************************************** */}
      {/*************************************************************************************************** */}
      <div>
        <img src={Lampe} alt="lampe" className={styles.lampe} />
        <img src={Cahier} alt="chaier" className={styles.cahier} />
        <div className={styles.content}>
          <h1 className={styles.titre1}>Inspire Collective </h1>
          <h1 className={styles.titre2}>Innovation</h1>
          <h2 className={styles.description1}>
            Unleash creativity though collaborative thinking
          </h2>
          <Link to="../login">
            <button className={styles.getstarted}>Get Started</button>
          </Link>
        </div>
      </div>
      {/*************************************************************************************************** */}
      {/*************************************************************************************************** */}
      {/*************************************************************************************************** */}
      {/*************************************************************************************************** */}
      {/*************************************************************************************************** */}
      <div className={styles.content2}>
        <h1 className={styles.titrecontent2}>
          Foster creativity through collective brainstorming,brainwriting.
        </h1>
        <h2 className={styles.description2}>Inspire Collective Innovation </h2>
        <div className={styles.divcards}>
          <div className={styles.card}>
            <div className={styles.blanc}>
              <img className={styles.image1} src={Card1} alt="card1" />
            </div>
            <div className={styles.noir}>
              <h2 className={styles.descriptioncard1}>AI-powered Idea</h2>
              <h2 className={styles.descriptioncard1}>Generation</h2>
              <Link className={styles.seelink} to="../Explication">
                See More
              </Link>
            </div>
          </div>
        </div>
        {/********************************************************************* */}
        {/********************************************************************** */}
        <div className={styles.divcards}>
          <div className={styles.card2}>
            <div className={styles.blanc}>
              <img className={styles.image1} src={Card2} alt="card2" />
            </div>
            <div className={styles.noir}>
              <h2 className={styles.descriptioncard1}>Interactive Chatbot </h2>
              <h2 className={styles.descriptioncard1}>Brainstorming</h2>
              <Link className={styles.seelink} to="../Explication">
                See More
              </Link>
            </div>
          </div>
        </div>
        {/********************************************************************* */}
        {/********************************************************************** */}
        <div className={styles.divcards}>
          <div className={styles.card3}>
            <div className={styles.blanc}>
              <img className={styles.image1} src={Card3} alt="card3" />
            </div>
            <div className={styles.noir}>
              <h2 className={styles.descriptioncard1}>Real-time Online</h2>
              <h2 className={styles.descriptioncard1}>Collaboration</h2>
              <Link className={styles.seelink} to="../Explication">
                See More
              </Link>
            </div>
          </div>
        </div>
        {/********************************************************************* */}
        {/********************************************************************** */}
        <div className={styles.divcards}>
          <div className={styles.card4}>
            <div className={styles.blanc}>
              <img className={styles.image1} src={Card4} alt="card4" />
            </div>
            <div className={styles.noir}>
              <h2 className={styles.descriptioncard1}>Voting and Rating </h2>
              <h2 className={styles.descriptioncard1}>System</h2>
              <Link className={styles.seelink} to="../Explication">
                See More
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/*************************************************************************************************** */}
      {/*************************************************************************************************** */}
      {/*************************************************************************************************** */}
      {/*************************************************************************************************** */}
      {/*************************************************************************************************** */}
      <div className={styles.content3}>
        <div className={styles.description3}>
          <h2 className={styles.titre3}>Synergy,Integrated,Unleashed</h2>
          <h3 className={styles.titre4}>
            Unlock the potential of our idea collection platform with AI-driven
            brainstorming, interactive chatbot collaboration, real-time online
            ideation, and effortless import-export functionality
          </h3>
          <h5 className={styles.titre5}>
            Innovative idea hub: AI-powered brainstorming, chatbot
            collaboration, real-time ideation, seamless import-export.
          </h5>
        </div>
        <div className={styles.container}>
          <img className={styles.imagecontainer} src={Cerveau} alt="" />
          <div className={styles.divcontainer}>
            <img className={styles.imagecontainer} src={Brainstorming} alt="" />
          </div>
        </div>
      </div>

      {/*************************************************************************************************** */}
      {/*************************************************************************************************** */}
      {/*************************************************************************************************** */}
      {/*************************************************************************************************** */}
      {/*************************************************************************************************** */}
      <div className={styles.content4}>
        <div className={styles.container4}>
          <img className={styles.imagecontainer4} src={Homme} alt="" />
        </div>
        <div className={styles.description4}>
          <h2 className={styles.titre44}>
            Innovative AI Brainstorming/Brainwriting Platform
          </h2>
          <h3 className={styles.titre45}>
            Effortlessly innovate with AI-driven brainstorming, interactive
            chatbot assistance, real-time online collaboration, and seamless
            import-export capabilities
          </h3>
          <Link to="../Explication">
            <button className={styles.learnmore}>Learn more</button>
          </Link>
        </div>
      </div>
      {/*************************************************************************************************** */}
      {/*************************************************************************************************** */}
      {/*************************************************************************************************** */}
      {/*************************************************************************************************** */}
      {/*************************************************************************************************** */}
      <div className={styles.content5}>
        <div>
          <h2 className={styles.titre5}>Ready to get started?</h2>
          <h2 className={styles.titre55}>Sign up or contact us</h2>
        </div>
        <div>
          <button className={styles.start}>Start free Trial</button>
          <Link to="../contact">
            <button className={styles.contactus}>Contact Us</button>
          </Link>
        </div>
      </div>

      {/*************************************************************************************************** */}
      {/*************************************************************************************************** */}
      {/*************************************************************************************************** */}
      {/*************************************************************************************************** */}
      {/*************************************************************************************************** */}
      <footer className={styles.content6}>
        <div className={styles.container6}>
          <img className={styles.logofooter} src={Logo} alt="logo" />
          <div className={styles.privacy}>
            <h4>Privacy — Terms</h4>
          </div>
        </div>

        <div>
          <div className={styles.titre6}>
            <h2>
              Ignite creativity. Spark innovation. Together, let's create
              brilliance!
            </h2>
          </div>
          <div className={styles.container66}>
            <div>
              <ul>
                <h2>About Us</h2>
                <li>Our Mission</li>
                <li>Our Team</li>
                <li>Contact Us</li>
              </ul>
            </div>
            <div>
              <ul>
                <h2>Services</h2>
                <li>Brainstorming Sessions</li>
                <li>Brainwriting Workshps</li>
                <li>Idea Generation Tools</li>
              </ul>
            </div>
            <div>
              <ul>
                <h2>Ressources</h2>
                <li>Blog</li>
                <li>Articles</li>
                <li>Templates</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Home;
