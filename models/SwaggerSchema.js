/**
 * @swagger
 * components:
 *   schemas:
 *     ContactSchema:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - phone
 *         - _id
 *         - user_id
 *         - createdAt
 *         - updatedAt
 *       properties:
 *         user_id:
 *           type: string
 *           default: "2938293239kwsdsafl"
 *         name:
 *           type: string
 *           default: "John"
 *         email:
 *           type: string
 *           default: "john@gmail.com"
 *         phone:
 *           type: string
 *           default: "298329238293"
 *         _id:
 *           type: string
 *           default: "293822900sdafka230923"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           default: "2023-08-08T16:45:10.899+00:00"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           default: "2023-08-08T16:45:10.899+00:00"
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     ContactCreate:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - phone
 *         - user_id
 *       properties:
 *         name:
 *           type: string
 *           default: John
 *         email:
 *           type: string
 *           default: john@gmail.com
 *         phone:
 *           type: string
 *           default: "+9129298323"
 *         user_id:
 *           type: string
 *           default: "2983asklfjasfkla"
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     UserCreate:
 *       type: object
 *       required:
 *         - id
 *         - email
 *         - phone
 *       properties:
 *         id:
 *           type: string
 *           default: "2893ufakfj3ekdlaf"
 *         email:
 *           type: string
 *           default: "john@gmail.com"
 *         phone:
 *           type: string
 *           default: "+9129298323"
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     UserCurrent:
 *       type: object
 *       required:
 *         - id
 *         - username
 *         - email
 *       properties:
 *         username:
 *           type: string
 *           default: "john"
 *         email:
 *           type: string
 *           default: "john@gmail.com"
 *         id:
 *           type: string
 *           default: "2893ufakfj3ekdlaf"
 */
