//Business Logic for AddressBook (#1)------
function AddressBook () {
  this.contacts = [];
  this.currentId = 0;
}

AddressBook.prototype.addContact = function (contact){
  contact.id = this.assignId();
  this.contacts.push(contact);
}

AddressBook.prototype.assignId = function(contact) {
  this.currentId += 1;
  return this.currentId;
}

AddressBook.prototype.findContact = function (id){
  for (let i = 0; i<this.contacts.length; i++) {
    if (this.contacts[i]){
    if(this.contacts[i].id == id){
      return this.contacts[i]
      }
    }
  };
  return false; 
}

AddressBook.prototype.deleteContact = function (id) {
  for (let i = 0; i <this.contacts.length; i ++) {
    if (this.contacts [i]){
    if (this.contacts[i].id == id){
      delete this.contacts[i];
      return true;
    }
    }
  };
  return false; 
}

AddressBook.prototype.findEmptyEmergencyContact = function (){
  for (let i = 0; i<this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (emergencyContact = " ") {
        alert(this.contacts[i].firstName + "Fill in your Emergency Contact Info");
      }
    }
  };
  return false; 
}

AddressBook.prototype.addEmergencyContactAll = function () {
  
  for (let i = 0; i <this.contacts.length; i ++) {
    if (this.contacts[i]){
    this.contacts[i].emergencyContact = " ";
    }
  };
}

//Business Logic for Contacts (#2)-----
function Contact (firstName, lastName, phoneNumber) {
  this.addresses = [];
  this.firstName = firstName; 
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.currentId = 0;
}

Contact.prototype.fullName = function () {
  return this.firstName + " " + this.lastName;
}

Contact.prototype.update = function (favoriteColor) {
  return this.favoriteColor = favoriteColor; 
  // return this.favoriteColor;
}
Contact.prototype.newFirstName = function (newFirstName) {
  return this.firstName = newFirstName;
}

Contact.prototype.addAddress = function (address){
  address.id = this.assignAddressId();
  this.addresses.push(address);
}

Contact.prototype.assignAddressId = function(address) {
  this.currentId += 1;
  return this.currentId;
}

Contact.prototype.findAddress = function (id){
  for (let i = 0; i<this.addresses.length; i++) {
    if (this.addresses[i]){
    if(this.addresses== id){
      return this.addresses[i]
      }
    }
  };
  return false; 
}

//Business Logic for Address
function Address (workEmail, homeEmail, physicalAddress) {
  this.workEmail = workEmail
  this.homeEmail = homeEmail;
  this.physicalAddress = physicalAddress;
}

// User Logic
let addressBook = new AddressBook();
let contact = new Contact();

function displayContactDetails(addressBookToDisplay) {
  let contactsList = $("ul#contacts");
  let htmlForContactInfo = "";
  addressBookToDisplay.contacts.forEach(function(contact) {
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactInfo);
};

function showContact(contactId){
  const contact = addressBook.findContact(contactId);
  const address = contact.findAddress(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".work-email").html(address.workEmail);
  $(".home-email").html(address.homeEmail);
  $(".physical-address").html(address.physicalAddress);
  let buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class = 'deleteButton' id=" + contact.id+ ">Delete</button>");
}

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function(){
    showContact(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
};


$(document).ready(function() {
  attachContactListeners();
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    const inputtedFirstName = $("input#new-first-name").val();
    const inputtedLastName = $("input#new-last-name").val();
    const inputtedPhoneNumber = $("input#new-phone-number").val();
    const inputtedWorkEmailAddress = $("input#new-work-email-address").val();
    const inputtedHomeEmailAddress = $("input#new-home-email-address").val();
    const inputtedPhysicalAddress = $("input#new-physical-address").val();
    
    $("input#new-first-name").val("");//clears the field where people type
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#new-work-email-address").val("");
    $("input#new-home-email-address").val("");
    $("input#new-physical-address").val("");
    
    let newAddress = new Address(inputtedWorkEmailAddress, inputtedHomeEmailAddress, inputtedPhysicalAddress)
    let newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, newAddress);
    contact.addAddress(newAddress);
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
  })
})