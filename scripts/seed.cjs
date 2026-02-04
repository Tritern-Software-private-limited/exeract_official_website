require("dotenv").config();
const { MongoClient } = require("mongodb");
const bcrypt = require("bcryptjs");

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB;
const ADMIN_COLLECTION = process.env.ADMIN_COLLECTION;
const CONTENT_COLLECTION = process.env.CONTENT_COLLECTION;
const POSTS_COLLECTION = process.env.POSTS_COLLECTION;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

const INITIAL_CONTENT = {
  hero: {
    badge: "New: Advanced Keyword Intelligence 2.0",
    headline: "Stop Wasting Hours on Manual Lead Verification",
    subheadline:
      "Exeract automatically verifies your leads against keywords with 95% accuracy. Upload, verify, and close deals 10x faster.",
    primaryCta: "Start Free Trial",
    secondaryCta: "See How It Works",
    trustBadges: ["No credit card required", "14-day free trial", "GDPR Compliant"],
  },
  howItWorks: {
    sectionTitle: "How It Works",
    heading: "Verify thousands of leads in minutes",
    description:
      "Stop manually checking websites. Our automated workflow handles the heavy lifting so you can focus on closing deals.",
    steps: [
      {
        title: "Upload Your Lead File",
        description:
          "Import CSV, Excel, or any file containing URLs in seconds. Our system automatically detects and parses your data structure.",
      },
      {
        title: "Set Your Keywords",
        description:
          "Define the exact criteria that qualify a lead for your business. Use boolean logic and negative keywords for precision.",
      },
      {
        title: "Get Confidence Scores",
        description:
          "Receive instant verification results with detailed confidence ratings. Export clean, verified lists ready for your sales team.",
      },
    ],
  },
  features: {
    sectionTitle: "Why Exeract?",
    heading: "Built for high-velocity sales teams",
    description:
      "Manual lead verification is slow, error-prone, and expensive. Exeract replaces the grunt work with intelligent automation, helping you scale your outreach without scaling your headcount.",
    features: [
      {
        title: "95% Verification Accuracy",
        description:
          "AI-powered analysis ensures you only pursue qualified leads. We cross-reference multiple data points to ensure validity.",
      },
      {
        title: "10x Faster Than Manual",
        description:
          "Process thousands of leads in minutes, not days. Free up your SDRs to focus on selling rather than researching.",
      },
      {
        title: "Keyword Intelligence",
        description:
          "Advanced matching algorithms understand context and relevance, not just exact text matches on the page.",
      },
      {
        title: "Detailed Reporting",
        description:
          "Export results with confidence scores and verification insights. Integrate directly with your CRM or outreach tools.",
      },
    ],
  },
  pricing: {
    plans: [
      {
        name: "Starter",
        price: "$49",
        period: "/month",
        description: "Perfect for small teams getting started with automation.",
        features: [
          "1,000 verifications/month",
          "Basic keyword matching",
          "CSV export",
          "Email support",
          "Single user",
        ],
      },
      {
        name: "Professional",
        price: "$149",
        period: "/month",
        description: "For growing businesses that need scale and precision.",
        popular: true,
        features: [
          "10,000 verifications/month",
          "Advanced keyword intelligence",
          "API access",
          "Priority support",
          "Custom integrations",
          "5 team members",
        ],
      },
      {
        name: "Enterprise",
        price: "Custom",
        period: "",
        description: "Tailored solutions for large-scale lead operations.",
        features: [
          "Unlimited verifications",
          "Dedicated account manager",
          "Custom AI training",
          "SLA guarantee",
          "White-label options",
          "SSO & Advanced Security",
        ],
      },
    ],
  },
  footer: {
    description:
      "Exeract helps B2B sales teams automate lead verification, ensuring you only spend time on qualified prospects.",
    email: "support@exeract.com",
  },
};

const INITIAL_POSTS = [
  {
    id: "1",
    title: "5 Signs Your Lead Verification Process is Broken",
    excerpt:
      "Are you wasting budget on bad leads? Here are the red flags to look for in your current qualification workflow.",
    content: "Full content would go here...",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    date: "Oct 12, 2023",
    author: "Sarah Jenkins",
    category: "Strategy",
  },
  {
    id: "2",
    title: "How AI is Transforming B2B Lead Qualification",
    excerpt:
      "Machine learning models can now predict lead quality with higher accuracy than human researchers. Here's how it works.",
    content: "Full content would go here...",
    image:
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=800",
    date: "Oct 28, 2023",
    author: "David Chen",
    category: "Technology",
  },
  {
    id: "3",
    title: "Case Study: How TechFlow Increased Conversion by 40%",
    excerpt:
      "See how a mid-sized SaaS company implemented automated verification and drastically improved their sales efficiency.",
    content: "Full content would go here...",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    date: "Nov 05, 2023",
    author: "Alex Rivera",
    category: "Case Study",
  },
];

async function run() {
  if (!MONGODB_URI) {
    throw new Error("Missing MONGODB_URI");
  }

  const client = new MongoClient(MONGODB_URI, {});
  await client.connect();
  const db = client.db(MONGODB_DB);

  const contentCollection = db.collection(CONTENT_COLLECTION);
  const postsCollection = db.collection(POSTS_COLLECTION);
  const adminsCollection = db.collection(ADMIN_COLLECTION);

  await contentCollection.updateOne(
    { _id: "landing" },
    {
      $set: {
        ...INITIAL_CONTENT,
        updatedAt: new Date(),
      },
      $setOnInsert: { createdAt: new Date() },
    },
    { upsert: true }
  );

  for (const post of INITIAL_POSTS) {
    await postsCollection.updateOne(
      { id: post.id },
      {
        $set: {
          ...post,
          updatedAt: new Date(),
        },
        $setOnInsert: { createdAt: new Date() },
      },
      { upsert: true }
    );
  }

  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);
  await adminsCollection.updateOne(
    { email: ADMIN_EMAIL },
    {
      $set: {
        email: ADMIN_EMAIL,
        passwordHash,
        role: "admin",
        updatedAt: new Date(),
      },
      $setOnInsert: { createdAt: new Date() },
    },
    { upsert: true }
  );

  await client.close();
  console.log("Seed complete.");
  console.log(`Admin: ${ADMIN_EMAIL}`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
