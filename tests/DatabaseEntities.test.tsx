import React from 'react';
import { describe, it, expect } from 'vitest';
import { User, Organization } from "../src/components/DatabaseEntities";

test('user creation', () => {
    const testUser : User = new User("John", "Doe", "Smith", "200012345");

    expect(testUser.getFirstName()).toStrictEqual("John");
    expect(testUser.getMiddleName()).toStrictEqual("Doe");
    expect(testUser.getLastName()).toStrictEqual("Smith");
    expect(testUser.getStudentNumber()).toStrictEqual("200012345");
});

test('org creation', () => {
    const testOrganization : Organization = new Organization(
        "Test Org 1",
        "1",
        "https://www.example.com/logo.png",
        "TO1",
        ["pic1.png", "pic2.png"],
        "Enter bio here",
        ["Tag 1", "Tag 2"],
        "January 1, 1970",
        "Manila, Philippines",
        ["Affiliate 1", "Affiliate 2"],
        ["test@example.com"],
        "https://www.example.com",
        "https://www.facebook.com/example",
        "Placeholder Description",
        "University-wide",
        "Open every semester"
    );

    expect(testOrganization.getOrgName()).toStrictEqual("Test Org 1");
    expect(testOrganization.getOrgId()).toStrictEqual("1");
    expect(testOrganization.getOrgLogo()).toStrictEqual("https://www.example.com/logo.png");
    expect(testOrganization.getOrgAcronym()).toStrictEqual("TO1");
    expect(testOrganization.getOrgPictures()).toStrictEqual(["pic1.png", "pic2.png"]);
    expect(testOrganization.getOrgBio()).toStrictEqual("Enter bio here");
    expect(testOrganization.getOrgTags()).toStrictEqual(["Tag 1", "Tag 2"]);
    expect(testOrganization.getDateFounded()).toStrictEqual("January 1, 1970");
    expect(testOrganization.getOrgLocation()).toStrictEqual("Manila, Philippines");
    expect(testOrganization.getOrgAffiliations()).toStrictEqual(["Affiliate 1", "Affiliate 2"]);
    expect(testOrganization.getOrgEmails()).toStrictEqual(["test@example.com"]);
    expect(testOrganization.getOrgWebsite()).toStrictEqual("https://www.example.com");
    expect(testOrganization.getOrgFacebook()).toStrictEqual("https://www.facebook.com/example");
    expect(testOrganization.getOrgDescription()).toStrictEqual("Placeholder Description");
    expect(testOrganization.getOrgScope()).toStrictEqual("University-wide");
    expect(testOrganization.getOpenForApplications()).toStrictEqual("Open every semester");
});

test('User adding organizations', () => {
    const testUser : User = new User("John", "Doe", "Smith", "200012345");
    const testOrg1 : Organization = new Organization("Test Org 1");
    const testOrg2 : Organization = new Organization("Test Org 2");
    const testOrg3 : Organization = new Organization("Test Org 3");

    testUser.addOrgsJoined(testOrg1);
    expect(testUser.getOrgNamesJoined()).toStrictEqual(["Test Org 1"]);

    testUser.addOrgsJoined(testOrg2);
    expect(testUser.getOrgNamesJoined()).toStrictEqual(["Test Org 1", "Test Org 2"]);

    testUser.addOrgsJoined(testOrg3);
    expect(testUser.getOrgNamesJoined()).toStrictEqual(["Test Org 1", "Test Org 2", "Test Org 3"]);
});