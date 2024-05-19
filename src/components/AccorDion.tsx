import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import styled from "styled-components";
import img from "../images/competencia.png";
import img2 from "../images/Isolation_Mode.svg";
import userGuide from "../assets/PRJ2_EQ126_Khouri_Khouani_noticeUtilisation.pdf"
import { GiBrain } from "react-icons/gi";

const MainContent = styled.div`
  height: 100%;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin: 20px;
  text-align: center;
  width: auto;
  font-family: "Fontbold";
  border-bottom-width: 4px;
  border-bottom-style: solid;
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
  border-bottom-color: #bfdbfe;
  background: linear-gradient(135deg, #3b82f6, #bfdbfe);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;
// import vd from "https://www.youtube.com/watch?v=rvoUeOgsh3I"
const AccorDion = () => {
  return (
    <div
      style={{
        height: "100%",

        width: "100%",
      }}
    >
      <MainContent>
        <div className="flex justify-center items-center">
          <Title>Frequently asked questions</Title>
        </div>
        <Accordion type="single" collapsible>
          <div
            style={{
              display: "flex",
              padding: "0 2rem",
              flexDirection: "column",
            }}
          >
            <AccordionItem value="item-1">
              <AccordionTrigger style={{ fontFamily: "Fontsemi" }}>
                <div
                  className="flex justify-center items-center "
                  style={{ fontFamily: "Fontsemi" }}
                >
                  What is{" "}
                  <span>
                    <img className=" ml-2 h-12 aspect-square" src={img2}></img>
                  </span>{" "}
                  ynaps ?
                </div>
              </AccordionTrigger>
              <AccordionContent
                style={{ fontFamily: "Fontregular", fontSize: "" }}
              >
                <ul className="p-4">
                  <li>
                    <span>
                      <GiBrain
                        color="#3b86f6"
                        className=" size-8 inline-block mr-4"
                      />
                    </span>
                    Synaps is an innovative platform dedicated to nurturing
                    creativity and idea development. Through real-time
                    collaboration and the ability to form teams, users can
                    seamlessly exchange ideas, offer insights, and provide
                    feedback. Our integrated chat bot enhances the user
                    experience by providing instant support and guidance,
                    ensuring a smooth and efficient workflow. Leveraging modern
                    technologies, Synaps offers a streamlined interface and
                    cutting-edge tools to drive creativity and productivity.
                  </li>
                  <br />
                  <li className="relative">
                    <span>
                      <GiBrain
                        color="#3b86f6"
                        className=" size-8 inline-block mr-4"
                      />
                    </span>
                    The term “Synaps” refers to a small gap at the end of a
                    neuron where nerve impulses pass from one neuron to another.
                    In the context of your website “Synaps,” which assists users
                    in collecting ideas through brainstorming and writing
                    essays, the connection lies in facilitating the transmission
                    of information—much like how neurons communicate across
                    synapses. Just as neurons connect and transmit signals, our
                    platform aims to connect users’s thoughts and facilitate the
                    exchange of ideas.
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger
                style={{
                  fontFamily: "Fontsemi",
                }}
              >
                <p className="flex gap-10 " style={{ fontFamily: "Fontsemi" }}>
                  Brain Writing{" "}
                  <span>
                    <img className=" aspect-square h-12" src={img}></img>
                  </span>{" "}
                  Brain Stroming
                </p>
              </AccordionTrigger>
              <AccordionContent
                style={{
                  fontFamily: "Fontregular",
                }}
              >
                <ul className="p-4">
                  <li className="relative">
                    <span>
                      <GiBrain
                        color="#3b86f6"
                        className=" size-8 inline-block mr-4"
                      />
                    </span>
                    Brainstorming is a collaborative technique used to generate
                    creative ideas or solutions to a problem. It fosters a free
                    flow of ideas within a group setting, often leading to the
                    exploration of diverse perspectives and innovative
                    solutions. By allowing participants to build upon each
                    other's ideas and associations, brainstorming can quickly
                    generate a large number of potential solutions or concepts.
                  </li>
                  <br />
                  On the other hand,
                  <br />
                  <br />
                  <li className="relative">
                    <span>
                      <GiBrain
                        color="#3b82f6"
                        className=" size-8 inline-block mr-4"
                      />
                    </span>
                    Brainwriting, a term derived from "brain" and "writing,"
                    focuses on individual reflection and ideation. Unlike
                    brainstorming, braiwriting emphasizes solitary exploration,
                    eliminating external distractions and interruptions
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger style={{ fontFamily: "Fontsemi" }}>
                How do I start a brainstorming or braiwriting session on the
                platform?
              </AccordionTrigger>
              <AccordionContent
                style={{ fontFamily: "Fontregular", fontSize: "" }}
              >
                <span>
                  <GiBrain
                    color="#3b86f6"
                    className=" size-8 inline-block mr-4"
                  />
                </span>
                To start a session, simply log in to your account and create a
                project after that select the option "Start New Brainstorming
                Session" or "Start New Braiwriting Session." Then, you can
                invite others to join or start alone.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger style={{ fontFamily: "Fontsemi" }}>
                How can I manage access permissions to brainstorming or
                braiwriting sessions?
              </AccordionTrigger>
              <AccordionContent
                style={{
                  fontFamily: "Fontregular",
                  fontSize: "",
                  display: "list-item ",
                  marginLeft: "1rem",
                }}
              >
                <span>
                  <GiBrain
                    color="#3b86f6"
                    className=" size-8 inline-block mr-4"
                  />
                </span>
                Synaps is an exclusive platform designed for the ESI community.
                It is accessible to students, faculty, and alumni of ESI. By
                creating a Synaps account, users can collaborate with their
                peers, exchange ideas, and develop projects in a secure and
                supportive environment. Synaps is dedicated to fostering
                creativity and innovation within the ESI community, providing a
                platform for students and faculty to connect and engage with one
                another.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger style={{ fontFamily: "Fontsemi" }}>
                How do I use the new messaging and ai feature?
              </AccordionTrigger>
              <AccordionContent
                style={{ fontFamily: "Fontregular", fontSize: "" }}
              >
                <span>
                  <GiBrain
                    color="#3b86f6"
                    className=" size-8 inline-block mr-4"
                  />
                </span>
                The new messaging and AI feature on Synaps allows users to
                communicate with each other in real-time and receive instant
                support and guidance from the integrated chat bot. To use this
                feature, simply click on the chat icon in the bottom right
                corner of the screen of your session . You can also type a
                message (question) and send it to a chat bot, which will provide
                you with a response based on your query. This feature is
                designed to enhance the user experience and provide users with
                the support they need to succeed on the platform.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger style={{ fontFamily: "Fontsemi" }}>
                How To use our Website ?
              </AccordionTrigger>
              <AccordionContent style={{ justifySelf: "center" }}>
                {
                  <iframe
                    className="rounded-lg m-auto"
                    width="100%"
                    height="315"
                    src={userGuide}
                    title="Synaps user guie"
                    allowFullScreen
                  ></iframe>
                }
              </AccordionContent>
            </AccordionItem>
          </div>
        </Accordion>
      </MainContent>
    </div>
  );
};

export default AccorDion;
