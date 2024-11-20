import axios from 'axios';

// Use your API key securely, avoid exposing it directly in the code
const API_KEY = "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";
const API_URL = "https://api.groq.com/openai/v1/chat/completions"; // Correct endpoint

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
  },
});

const generateResponse = async (messages) => {
  try {
    const response = await api.post('', {
      messages,
      model: "llama3-8b-8192", // Specify model for Groq API
    });
    return response.data.choices[0]?.message?.content;
  } catch (error) {
    console.error("API request failed:", error);
    throw new Error("Failed to process the request");
  }
};
// export const convertCode = async ({ sourceCode, targetLanguage }) => {
//   const messages = [
//     {
//       role: "system",
//       content: `You are an experienced senior developer specializing in converting legacy code to modern programming languages. Convert the following legacy COBOL code into ${targetLanguage}. 
//                 The conversion should:
//                 1. Maintain the functionality of the original code.
//                 2. Optimize the converted code for readability, performance, and maintainability.
//                 3. Ensure proper handling of file I/O operations in ${targetLanguage}.
//                 4. Avoid introducing unnecessary complexity or external libraries not essential to the core functionality.
//                 5. Provide only the converted code without any additional explanations, comments, or special characters.`
//     },
//     {
//       role: "user",
//       content: sourceCode
//     }
//   ];
//   return await generateResponse(messages);
// };

export const convertCode = async ({ sourceCode, targetLanguage }) => {
  const messages = [
    {
      role: "system",
      content: `You are an experienced senior developer specializing in converting legacy code from older programming languages to modern languages. Your task is to convert the provided legacy code into ${targetLanguage} and Return only the converted code.
      Ensure the following guidelines are strictly adhered to during the conversion:
      1. **Functionality and Logic**: Maintain all the functionality and logic of the original code without alteration.
      2. **Optimization**: Optimize the code for:
         - Readability: Use descriptive variable and function names.
         - Performance: Implement efficient algorithms and data structures.
         - Maintainability: Use modular design and proper code organization.
      3. **Modern Conventions**: Incorporate modern programming practices:
         - Object-oriented design (where applicable).
         - Use of appropriate language constructs, such as async/await in JavaScript, or list comprehensions in Python.
      4. **Input/Output Handling**: Implement file handling and input/output operations in a way that aligns with ${targetLanguage} standards.
      5. **Error Handling**: Include robust error handling mechanisms to account for edge cases.
      6. **Avoid Complexity**: Refrain from adding unnecessary complexity. Use native libraries or features unless external libraries are essential for the task.
      7. **Code Output**: Return the converted code in a format suitable for ${targetLanguage}, with clear and consistent formatting.
      8. **No Comments or Explanations**: The output should be the converted code only, with no additional text or comments.
      `
    },
    {
      role: "user",
      content: `Legacy Code:
      ${sourceCode}

      Conversion Target:
      Language: ${targetLanguage}`
    }
  ];
  return await generateResponse(messages);
};





export const debugCode = async (convertedCode) => {
  const messages = [
    {
      role: "system",
      content: "As a senior developer, analyze the following converted code for any potential issues. Identify any bugs, inefficiencies, or deviations from best practices. Provide detailed debugging insights and recommendations for improvements, but do not return the corrected code itself."
    },
    { role: "user", content: convertedCode }
  ];
  return await generateResponse(messages);
};


export const optimizeCode = async (sourceCode) => {
  const messages = [
    { role: "system", content: "Optimize the following code for better performance." },
    { role: "user", content: sourceCode }
  ];
  return await generateResponse(messages);
};

export const explainCode = async (convertedCode) => {
  const messages = [
    { 
      role: "system", 
      content: `
        As an experienced developer, break down the following code in detail and provide a comprehensive explanation:
        - **Purpose and Design**: Explain the overall purpose of the code, the problem it solves, and the logic behind its design.
        - **Key Functions, Methods, and Classes**: 
          - Describe the key functions, methods, and classes in the code.
          - For each, explain their purpose, parameters, return values, and any exceptions they may throw.
        - **Variable and Parameter Naming**: 
          - Analyze the variables and parameters used in the code.
          - Ensure the names follow meaningful naming conventions and describe any improvements if needed.
        - **Code Structure and Organization**: 
          - Analyze the structure of the code.
          - Discuss how it is organized, including indentation, formatting, and how related functions or classes are grouped together.
        - **Error Handling**: 
          - Identify any error handling mechanisms, custom exceptions, and how they are managed.
        - **Code Consistency and Readability**: 
          - Assess the code’s consistency and adherence to coding standards.
          - Analyze overall readability and maintainability, suggesting improvements if applicable.
        - **External Documentation or Dependencies**: 
          - If the code uses external libraries, APIs, or frameworks, explain how they are utilized.
          - Mention any external documentation or test cases associated with the code.
      `
    },
    { role: "user", content: convertedCode }
  ];
  return await generateResponse(messages);
};





