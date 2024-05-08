/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import styled from "styled-components";
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  width: 50%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
const MainContent = styled.div`
  height: 100%;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  color: hsl(var(--primary)); /* Remove default color if using gradient */
  margin-left: 20px;
  margin-bottom: 20px;
  margin-top: 20px;
  font-weight: bold;
  text-align: center;

  font-family: var(--font-geist-sans), sans-serif;
`;

const AccorDion = () => {
  return (
    <div
      style={{
        height: "100%",

        width: "100%",
      }}
    >
      <MainContent>
        <Title>Frequently asked questions</Title>
        <Accordion type="single" collapsible>
          <div style={{ display: "flex", padding: "0 2rem" }}>
            <Wrapper>
              <AccordionItem value="item-1">
                <AccordionTrigger>What is TikTa ?</AccordionTrigger>
                <AccordionContent>
                  Tikta, derived from the Amazigh word meaning 'Idea,' is a
                  platform dedicated to the collection and development of ideas.
                  Our website is built upon the principles of brainstorming and
                  brain-writing techniques. We provide a collaborative space
                  where users can contribute, refine, and nurture innovative
                  concepts to fruition.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  Brain Writing VS Brain Stroming
                </AccordionTrigger>
                <AccordionContent>
                  Brainstorming:
                  <br />
                  Brainstorming is a creative problem-solving technique where a
                  group of individuals generates ideas spontaneously and without
                  judgment, typically in a collaborative setting. The focus is
                  on quantity rather than quality, aiming to spark creativity
                  and innovation through free-flowing idea generation.
                  <br />
                  Brain-writing:
                  <br />
                  Brain-writing is a structured approach to idea generation
                  where participants individually and silently write down their
                  ideas on paper or digital platforms. After a designated time,
                  ideas are shared with the group, allowing for simultaneous
                  contribution from all participants and reducing the influence
                  of dominant voices. This method encourages equal participation
                  and often leads to a diverse range of creative suggestions.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>What are our Features?</AccordionTrigger>
                <AccordionContent>
                  Tikta is an innovative platform dedicated to nurturing
                  creativity and idea development. Through real-time
                  collaboration and the ability to form teams, users can
                  seamlessly exchange ideas, offer insights, and provide
                  feedback. Our integrated chat bot enhances the user experience
                  by providing instant support and guidance, ensuring a smooth
                  and efficient workflow. Leveraging modern technologies, Tikta
                  offers a streamlined interface and cutting-edge tools to drive
                  creativity and productivity.
                </AccordionContent>
              </AccordionItem>
            </Wrapper>
            <Wrapper>
              <AccordionItem value="item-4">
                <AccordionTrigger>Who Has Access to TikTa?</AccordionTrigger>
                <AccordionContent>
                  Tikta is the go-to platform exclusively designed for the ESI
                  (Ecole Nationale Supérieure d'Informatique) community in
                  Algeria. It's a hub where teachers, students, and clubs
                  collaborate seamlessly. With Tikta, members can exchange
                  ideas, work on projects, and leverage cutting-edge
                  technologies to elevate their academic and professional
                  journeys within the vibrant ESI community. Join Tikta today
                  and be part of the innovation wave at ESI
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>
                  How do I use the new messaging and ai feature?
                </AccordionTrigger>
                <AccordionContent>
                  When you start a session, you'll find two buttons that provide
                  access to the new messaging and AI feature. Simply click on
                  the messaging button to initiate a conversation with other
                  users, and click on the AI button to access our advanced
                  artificial intelligence capabilities. These buttons will guide
                  you through the process of utilizing these exciting new
                  features!
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-6">
                <AccordionTrigger>How To use our Website ? `</AccordionTrigger>
                <AccordionContent>
                  {
                    <video controls>
                      <source src={vd} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  }
                </AccordionContent>
              </AccordionItem>
            </Wrapper>
          </div>
        </Accordion>
      </MainContent>
    </div>
  );
};

export default AccorDion;
