export enum NavbarItemEnum {
  // Dropdown menu. Format:
  //   {
  //     "type": NavbarItemEnum.Dropdown,
  //     "title": <dropdown title>,
  //     "items": <array of entries>
  //   }
  // Currently does not support nested dropdowns.
  Dropdown = "DROPDOWN",
  // Divider within a dropdown menu.
  DropdownDivider = "DROPDOWN_DIVIDER",
  // Non-link text in a dropdown.
  DropdownText = "DROPDOWN_TEXT",
  // Regular link. Format:
  //   {
  //     "type": NavbarItemEnum.Link,
  //     "destination": <page identifier>
  //     "title": <link title> (optional, otherwise uses page title)
  //   }
  Link = "LINK",
};

// Describes navbar layout, where each item is a page in content.ts.
export const navbarItems: Array<Record<any>> = [
  {
    "type": NavbarItemEnum.Link,
    "destination": "home",
  },
  {
    "type": NavbarItemEnum.Dropdown,
    "title": "Undefended agent",
    "items": [
      {
        "type": NavbarItemEnum.Link,
        "destination": "adversarial-policy-katago",
      },
      {
        "type": NavbarItemEnum.Link,
        "destination": "game-analysis",
      },
      {
        "type": NavbarItemEnum.Link,
        "destination": "human-evaluation",
      },
      {
        "type": NavbarItemEnum.Link,
        "destination": "transfer",
      },
      {
        "type": NavbarItemEnum.Link,
        "destination": "undefended-agent-faq",
      },
    ],
  },
  {
    "type": NavbarItemEnum.Link,
    "destination": "positional-adversarial-training",
  },
  {
    "type": NavbarItemEnum.Link,
    "destination": "iterated-adversarial-training",
  },
  {
    "type": NavbarItemEnum.Link,
    "destination": "vit",
  },
  {
    "type": NavbarItemEnum.Dropdown,
    "title": "Extra content",
    "items": [
      {
        "type": NavbarItemEnum.DropdownText,
        "text": "Undefended agent",
      },
      {
        "type": NavbarItemEnum.Link,
        "destination": "activation-plots",
      },
      {
        "type": NavbarItemEnum.Link,
        "destination": "baseline-attack",
      },
      {
        "type": NavbarItemEnum.Link,
        "destination": "pass-based-attack",
      },
      {
        "type": NavbarItemEnum.Link,
        "destination": "training-sample",
      },
      {
        "type": NavbarItemEnum.DropdownDivider,
      },
      {
        "type": NavbarItemEnum.DropdownText,
        "text": "Positional adversarial training",
      },
      {
        "type": NavbarItemEnum.Link,
        "destination": "adversarial-training",
        "title": "Early results",
      },
      {
        "type": NavbarItemEnum.DropdownDivider,
      },
      {
        "type": NavbarItemEnum.DropdownText,
        "text": "Iterated adversarial training",
      },
      {
        "type": NavbarItemEnum.Link,
        "destination": "iterated-adversarial-training-per-iteration",
        "title": "Per-iteration progress",
      },
    ],
  },
];
