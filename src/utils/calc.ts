import * as cheerio from "cheerio";

const SELECTOR_CONTAINER = "._ab8w._ab94._ab99._ab9h._ab9m._ab9o._abcm";
const SELECTOR_ID = "._ab8y._ab94._ab97._ab9f._ab9k._ab9p._abcm";
const SELECTOR_NAME = "._aacl._aaco._aacu._aacy._aada";

export const calc = (html: string) => {
  const users: Record<string, User> = {};
  const $ = cheerio.load(html, null, false);
  $(SELECTOR_CONTAINER).each((_index, elem) => {
    console.log($(elem).html());

    const id = $(SELECTOR_ID, elem).text();
    const name = $(SELECTOR_NAME, elem).text();
    users[id] = { id, name };
  });

  return users;
};

export const extract = (followersHtml: string, followingsHtml: string) => {
  const followers = calc(followersHtml);
  const following = calc(followingsHtml);

  const followerIds = Object.keys(followers);
  const followingIds = Object.keys(following);

  const obj = Object.entries(Object.assign({}, followers, following));

  const res = obj.map<AdjustedUser>(([key, user]) => ({
    ...user,
    follower: followerIds.includes(key),
    following: followingIds.includes(key),
  }));

  return res;
};
