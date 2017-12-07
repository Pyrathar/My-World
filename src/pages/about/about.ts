import { Component } from "@angular/core";

@Component({
  selector: "page-about",
  templateUrl: "about.html",
})
export class AboutPage {

  private slides;

  constructor() {
    this.slides = [
      {
        p1: `In a consultation, audiologists often manage to gain the perspective of the parent or the teacher, but it is not as easy to engage the child and gain their perspective in the rehabilitation process. In order to address the challenges of the hearing loss in a holistic way, the child’s perspective is essential and central to effective management.`,
        p2: `The My World tool facilitates an understanding of hearing loss from the child’s point of view. By manipulating the tool components and creating the scene themselves, the child can externalize the hearing loss and discuss the successes and challenges related to communication in a concrete and non-threatening way. This gives the child a voice and makes them an active participant in the rehabilitation process.`,
        p3: `For the audiologist the tool facilitates open-ended questioning and provides a creative way to stimulate curiosity, joint attention and shared understanding about aspects of communication most relevant to the child.`,
        title: "Why this tool",
      },
      {
        p1: `The tool consists of three different environments: A classroom, a home, and an outdoor area as well as a set of movable figures and everyday objects that the child can use to describe communication successes and challenges in daily life. Hands-on instructions on how to use the app are available in the Instructions section.`,
        title: "Step by Step (environments)",
      },
      {
        p1: `My World can be introduced at any point during your appointment with the child. Before introducing the tool, you may want to consider how conversations progress and what information you need to gather from the child. You may have an intuition that there is more to be said or learned, but that the shyness or reticence of the child or family member prevents the conversation from progressing. This would be a good time to introduce the tool.`,
        p2: `A session with the tool can also help educate the parents about their child’s life with hearing loss. This would be a good opportunity to introduce the tool and explore the child’s perspective.`,
        title: "When to introduce My World",
      },
      {
        p1: `Begin by choosing the environment most relevant to the appointment. Ask the child to make it their own by selecting elements that are meaningful to them in their daily life in the chosen environment. Ask open-ended questions and listen to the child. You may for example, begin by asking the child to take you on a tour of the environment and to describe what happens.`,
        title: "Phase One: Choosing the Environment and Being Curious",
      },
      {
        p1: `Based on the child’s description, identify current communication strategies that work well and may be reinforced, understand which situations are challenging, and talk about possible new strategies which could result in more easy communication.`,
        title: "Phase Two: Understanding Successes and Challenges and Identifying Strategies",
      },
      {
        p1: `In order for you to remember what was discussed and decided in the appointment, you may use the documentation form provided to record what you learned about the child’s communication and which goals and actions were agreed upon. This can be accessed`,
        title: "Phase Three: Documenting Decisions and Strategies",
      },
      {
        p1: `For more information about the My World tool, and printable documentation forms, please visit:`,
        link: "https://idainstitute.com/toolbox/my_world/",
        title: "Link to MyWorld Page on Website for more info",
      },
      {
        p1: `The Ida Institute is an independent, non-profit organization working to integrate person-centered care in hearing rehabilitation. We aim to enable people with hearing loss to take an active role in their care by expressing their needs and preferences.`,
        p2: "Together with hearing care professionals around the world, we develop free tools and resources to strengthen the counseling process.",
        title: "About Ida",
      },
    ];
  }
}
