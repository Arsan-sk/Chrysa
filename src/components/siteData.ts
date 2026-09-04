export const projects = [
  { name: 'Bonhomie', kind: 'Event registration platform', note: 'A calmer way to hold 3,000+ real registrations.', tone: 'coral' },
  { name: 'Share-Bite', kind: 'Social impact application', note: 'Making food-sharing easier to coordinate.', tone: 'lime' },
  { name: 'Tony', kind: 'Outbound voice agent', note: 'Turning a conversation into a useful next step.', tone: 'blue' },
]

export const capabilities = [
  ['01', 'We Build', 'Websites, web applications, SaaS and internal tools that make the next step easier to take.', 'Websites · products · internal tools'],
  ['02', 'We Automate', 'Workflows, integrations, dashboards and process systems that remove repeat work.', 'Automation · integrations · dashboards'],
  ['03', 'We Understand', 'AI integrations, digital experiences and product thinking that solve a real business problem.', 'AI · UI/UX · digital experiences'],
  ['04', 'We Evolve', 'SEO, infrastructure, analytics and ongoing refinement that help a system keep earning its place.', 'Growth · hosting · maintenance'],
] as const

export const processSteps = [
  ['Discover', 'Understand the real context.'],
  ['Define', 'Find the problem worth solving.'],
  ['Design', 'Shape the clearest experience.'],
  ['Build', 'Engineer it to work in the world.'],
  ['Refine', 'Test, improve and make it feel right.'],
  ['Evolve', 'Maintain, measure and make it more capable.'],
] as const
