# LP-Koala
## DLASSP Project 


## Project Overview
The DLASSP project is conceived as a comprehensive and customisable LMS, tailored specifically for a unique user system consisting of Admins, Researchers, and Raters. The platform is intended to provide a versatile digital environment where the users can manage, participate in, and evaluate a variety of educational and assessment-oriented projects. Each user group is granted access privileges aligned with their operational scope and responsibilities to facilitate efficient project management, content creation, user interaction, and data analysis.

## Project Goal
Develop a Customisable and Secure LMS: Create a platform that can be tailored to the roles of Admin, Researchers, and Raters, ensuring secure and correct access to content and features according to user roles.<br>
Enable Efficient Project and User Management: Implement comprehensive administrative functions for user management.<br>
Facilitate Specialised Content Creation and Management: Equip researchers with advanced tools for creating, editing, and managing educational content.<br>
Enhance Rater Interaction and Engagement: Allow raters to engage with the content through interactive activities and provide meaningful feedback.<br>
Ensure Data Security and Integrity: Prioritise the protection of sensitive information.<br>
Establish a Collaborative Environment: Build forums where users can share insights, discuss evaluations, and contribute to the collective knowledge base.

## Team Introduction
Weiyang Wu - Product Owner: As the product owner, Weiyang is the visionary driving the project forward. He is responsible for defining the goals and creating the product roadmap.<br>
Haofeng Chen - Scrum Master: Haofeng serves as the scrum master of team, acting as the glue that holds the team together by ensuring the Scrum framework is properly implemented for the maximum efficiency and effectiveness.<br>
Gaoyuan Ou - Front-end Developer: Gaoyuan mainly focuses on the front end development.<br>
Mingxin Li - UX/UI Designer: Mingxin crafts user-friendly and aesthetically pleasing interfaces.<br>
Yujin Du - Back-end Developer: Yujin mainly focuses on the back end development.<br>
Qinglin Zhao - Back-end Developer: Qinglin will be commited to the back end development together with Yujin.<br>

## Workflow
Our project uses a Git Flow branching strategy to streamline development and ensure stability:<br>
Main Branch: Serves as the official project history, containing production-ready code.<br>
Develop Branch: Acts as an integration branch for features, fixes, and updates. All completed work is merged here before being deployed to the main branch.<br>
Feature Branches: For new features and non-emergency bug fixes. Branch off from and merge back into the develop branch.<br>
Release Branches: Used to prepare for a new production release. They allow for minor bug fixes and preparing meta-data for a release.

Naming Conventions<br>
Branches: Use a clear, descriptive name that reflects the feature or fix, prefixed accordingly: feature/, bugfix/, or release/. Example: feature/add-user-profiles.<br>
Commits: Start with a verb in the imperative mood, followed by a concise description: "Add user login functionality".<br>
Pull Requests: Title should match the branch purpose, and the description should clearly explain the change, including any relevant issue or task numbers.

Workflow Process<br>
Task Assignment: Tasks are assigned during the sprint planning meeting, documented in our project management tool.<br>
Development: Work on your assigned tasks in the corresponding branch type. Regularly push your changes to the remote repository.<br>
Code Review: Once a task is completed, open a PR for code review. At least one other team member must review and approve the changes.<br>
Testing: After approval, the changes are tested. This includes unit tests, integration tests, and manual testing where necessary.<br>
Merging: Once testing is passed, the PR is merged into the develop branch. Release branches are merged into main and develop once they are ready for deployment.<br>
Deployment: Changes in the main branch are deployed to production according to our release schedule.