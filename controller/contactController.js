const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

/**
 * @swagger
 * /api/contacts:
 *  get:
 *    tags:
 *      - Contacts end points
 *    summary: Get list of contacts (requires authentication)
 *    security:
 *     - bearerAuth: []
 *    responses:
 *      200:
 *        description: Successful response
 *        content:
 *          application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ContactSchema'
 *      401:
 *        description: Unauthorized
 *      500:
 *        description: Internal Server Error
 */

const getContacts = asyncHandler(async (req, res) => {
  try {
    const contacts = await Contact.find({
      user_id: req.user.id,
    });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500);
    throw new Error("Facing technical difficulties");
  }
});

/**
 * @swagger
 * /api/contacts:
 *   post:
 *     tags:
 *      - Contacts end points
 *     summary: Create a new contact (requires authentication)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *         type: object
 *         properties:
 *          name:
 *           type: string
 *           default: John
 *          email:
 *           type: string
 *           default: john@gmail.com  
 *          phone:
 *           type: string
 *           default: +9192832938 
 *     responses:
 *       201:
 *         description: Successful creation of contact
 *         content:
 *          application/json:
 *           schema:
 *            $ref: '#/components/schemas/ContactSchema'
 *       401:
 *         description: Unauthorized - user is not authorized or token is missing
 *       400:
 *         description: Bad Request - all fields are mandatory or contact already exist
 *       500:
 *         description: Server Error
 */
const createContact = asyncHandler(async (req, res) => {
  console.log("Request body is: ", req.body);
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All Fields are mandatory");
  }

  const contactAvailable = await Contact.findOne({ email: email, phone:phone });

  if(contactAvailable){
    res.status(400);
    throw new Error("Person with same email and phone already exists")
  }
  else{
    const contact = await Contact.create({
      name,
      email,
      phone,
      user_id: req.user.id,
    });
  
    res.status(201).json(contact);
  }
  
});

/**
 * @swagger
 * /api/contacts/{id}:
 *  get:
 *   tags:
 *      - Contacts end points
 *   summary: Get a contact by ID (requires authentication)
 *   security:
 *    - bearerAuth: []
 *   parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      schema:
 *       type: string
 *      description: The ID of the contact to retrieve 
 *   responses:
 *    200:
 *     description: Successful response
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/ContactSchema'  
 *    401:
 *     description: Unauthorized - missing or invalid token
 *    404:
 *     description: Contact not found 
 *  
 */

const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  res.status(200).json(contact);
});

/**
 * @swagger
 * /api/contacts/{id}:
 *  put:
 *   tags:
 *      - Contacts end points
 *   summary: Update the contact details (requires authentication) 
 *   security:
 *    - bearerAuth: []
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        name:
 *         type: string
 *         default: John
 *        email:
 *         type: string
 *         default: john@gmail.com  
 *        phone:
 *         type: string
 *         default: +9192832938  
 *   parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      schema:
 *       type: string
 *       description: The ID of the contact to update
 *   responses:
 *    200:
 *     description: Successfully update the contact
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/ContactSchema'   
 *    404:
 *     description: Contact not found 
 *    401:
 *     description: Unauthorized - missing or invalid token
 *    403:
 *     description: Forbidden - don't have permission to delete contact of other user
 */

const updateContact = asyncHandler(async (req, res) => {
  console.log("started updating the contact")
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res(403);
    throw new Error("User don't have permission to update other user contact");
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedContact);
});

/**
 * @swagger
 * /api/contacts/{id}:
 *  delete:
 *   tags:
 *      - Contacts end points
 *   summary: delete the contact with specified ID (requires authentication) 
 *   security:
 *    - bearerAuth: []
 *   parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      schema:
 *       type: string
 *       description: The ID of the contact to delete
 *   responses:
 *    200:
 *     description: Successfully delete the contact
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/ContactSchema'   
 *    401:
 *     description: Unauthorized - missing or invalid token
 *    403:
 *     description: Forbidden - don't have permission to delete contact of other user
 *    404:
 *     description: Contact not found 
 */
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res(403);
    throw new Error("User don't have permission to update other user contact");
  }
  await Contact.findByIdAndRemove(req.params.id);

  res.status(200).json(contact);
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
