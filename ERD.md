# GoInvesto ERD (Entity Relationship Diagram)

Entities and Relationships:

- User
  - id (PK)
  - name
  - email
  - passwordHash
  - role (startup, investor, incubator)
  - profileImage
  - createdAt

- StartupProfile
  - id (PK)
  - userId (FK to User)
  - domain
  - stage
  - location
  - revenue
  - valuation
  - documents
  - description
  - fundingStage
  - website
  - contactInfo

- InvestorProfile
  - id (PK)
  - userId (FK to User)
  - domainsInterested
  - fundingRange
  - location
  - portfolio

- IncubatorProfile
  - id (PK)
  - userId (FK to User)
  - location
  - portfolioDetails
  - eventsPosted
  - description

- Post
  - id (PK)
  - userId (FK to User)
  - type (common, event, achievement)
  - content
  - createdAt

- Notification
  - id (PK)
  - senderId (FK to User)
  - receiverId (FK to User)
  - type (startup_to_investor, investor_to_startup)
  - status (pending, read)
  - createdAt

- Event
  - id (PK)
  - incubatorId (FK to User)
  - title
  - description
  - date
  - location
  - attendees (list of User IDs)

Relationships:

- 1 User has 1 StartupProfile OR 1 InvestorProfile OR 1 IncubatorProfile
- 1 IncubatorProfile has many Events
- 1 Notification is from 1 User to another User
