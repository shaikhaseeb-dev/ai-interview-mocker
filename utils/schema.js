import {
  pgTable,
  text,
  varchar,
  uuid,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";

export const mockInterviews = pgTable("mock_interviews", {
  id: uuid("id").defaultRandom().primaryKey(),

  jsonMockResp: text("json_mock_resp").notNull(),

  jobPosition: varchar("job_position", { length: 255 }).notNull(),
  jobDesc: varchar("job_desc", { length: 500 }).notNull(),
  jobExperience: varchar("job_experience", { length: 50 }).notNull(),

  createdBy: varchar("created_by", { length: 255 }).notNull(),
  mockId: varchar("mock_id", { length: 255 }).notNull(),

  createdAt: timestamp("created_at").defaultNow(),
});

export const interviewAnswers = pgTable("interview_answers", {
  id: uuid("id").defaultRandom().primaryKey(),

  mockId: varchar("mock_id", { length: 255 }).notNull(),
  userEmail: varchar("user_email", { length: 255 }).notNull(),

  questionIndex: integer("question_index").notNull(),
  question: text("question").notNull(),
  userAnswer: text("user_answer").notNull(),
  correctAnswer: text("correct_answer").notNull(),

  score: integer("score"),
  feedback: text("feedback"),
  improvements: text("improvements"),

  createdAt: timestamp("created_at").defaultNow(),
});
