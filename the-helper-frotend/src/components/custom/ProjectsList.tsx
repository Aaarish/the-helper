import { Project } from "./Project";

const ProjectsList = () => {
    return (
        <div className="max-w-lg mx-auto space-y-4">
            <Project
                title="AI Chatbot"
                description="This AI Chatbot helps users with queries using NLP and machine learning algorithms, providing fast, accurate, and contextual responses. Built with Python, FastAPI, and React frontend."
                owner="Leonardo"
                projectUrl="https://github.com/leonardo/ai-chatbot"
                projectImage="https://plus.unsplash.com/premium_photo-1753362738169-7339cb00efa4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                teamMembers={["Alice", "Bob", "Charlie"]}
            />

            <Project
                title="E-commerce Website"
                description="An online store with product listings, cart functionality, and secure payment integration. Developed using React, Node.js, and Stripe API."
                owner="Sarah"
                projectUrl="https://myecommerce.com"
                projectImage="https://plus.unsplash.com/premium_photo-1754067486503-e3f98909b13a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                teamMembers={["David", "Emma", "Frank"]}
            />
        </div>
    );
};

export default ProjectsList;
