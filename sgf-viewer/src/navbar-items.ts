export enum NavbarItemEnum {
  // Regular navbar link. Format:
  //   {
  //     "type": NavbarItemEnum.Link,
  //     "destination": <page identifier>
  //   }
  Link = "LINK",
  // Dropdown menu. Format:
  //   {
  //     "type": NavbarItemEnum.Dropdown,
  //     "title": <dropdown title>,
  //     "items": <array of entries>
  //   }
  // Currently does not support nested dropdowns.
  Dropdown = "DROPDOWN",
};

// Describes navbar item layout, where each item is a page in content.ts.
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
    ],
  },
  {
    "type": NavbarItemEnum.Link,
    "destination": "defense-home",
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
        "type": NavbarItemEnum.Link,
        "destination": "adversarial-training",
      },
      {
        "type": NavbarItemEnum.Link,
        "destination": "iterated-adversarial-training-per-iteration",
      },
    ],
  },
];
