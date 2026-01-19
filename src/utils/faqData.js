// FAQ data organized by categories
export const faqCategories = [
  {
    id: 0,
    name: "Product",
    questions: [
      {
        question: "What services does Arohance Tech offer?",
        answer: "We specialize in creating stunning, functional websites for businesses across different industries. Our services include web development, UI/UX design, mobile app development, and digital marketing solutions."
      },
      {
        question: "What technologies do you use?",
        answer: "We use cutting-edge technologies including React, Next.js, Node.js, Python, and various cloud platforms. Our tech stack is chosen based on project requirements to ensure optimal performance and scalability."
      },
      {
        question: "How do you ensure project quality?",
        answer: "We follow industry best practices including rigorous testing, code reviews, and iterative feedback cycles. Our team maintains high standards throughout the development process to deliver exceptional results."
      }
    ]
  },
  {
    id: 1,
    name: "Features",
    questions: [
      {
        question: "How long does it take to complete a project?",
        answer: "Project timelines vary depending on complexity and requirements. Typically, a standard website takes 2-4 weeks, while more complex applications can take 6-12 weeks. We provide detailed timelines during our initial consultation."
      },
      {
        question: "Do you work with startups and small businesses?",
        answer: "Absolutely! We work with businesses of all sizes, from startups to established enterprises. We understand the unique challenges each business faces and tailor our solutions accordingly."
      },
      {
        question: "Do you provide ongoing support and maintenance?",
        answer: "Yes, we offer comprehensive support and maintenance packages to ensure your website or application continues to perform optimally. This includes regular updates, security patches, and technical support."
      }
    ]
  }
];

// Flatten all questions for easier indexing
export const createFlattenedQuestions = (categories) => {
  return categories.flatMap((category, categoryIndex) =>
    category.questions.map((question, questionIndex) => ({
      ...question,
      categoryId: category.id,
      categoryName: category.name,
      globalIndex: categoryIndex * 100 + questionIndex,
      categoryIndex,
      questionIndex
    }))
  );
};