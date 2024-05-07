import { zombieViewParam } from "./consts.ts";
import { User } from "./user.ts";

export class Zombie extends User {
  toHTML(): HTMLElement {
    const element = document.createElement("div");
    element.className = "zombie";

    // 取得するときに余計な改行と空白がついてくるため、this.idの前後に改行を入れない
    element.innerHTML = `
      <div class="tweet-content">
        <div class="zombie-profile">
          <div class="zombie-name">${this.name}</div>
          <div class="zombie-id">${this.id}</div>
        </div>
        <div class="tweet-text">${this.trimmedText}</div>
      </div>
      <div class="options">
        <div class="tweet-url-wrapper buttons">
          <a href="${this.noHideURL}" class="tweet-url">
            <!-- アイコンは https://kotonohaworks.com/free-icons/gaibu-link/ 「線画の外部リンク」を使用させていただきました。 -->
            <?xml version="1.0" encoding="UTF-8" standalone="no"?>
            <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
            <svg class="tweet-url-button buttons" width="100%" height="100%" viewBox="0 0 800 800" version="1.1"
              xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve"
              xmlns:serif="http://www.serif.com/"
              style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1;">
              <g transform="matrix(1,0,0,1,-235,-1950)">
                <g transform="matrix(2.02015,0,0,2.02017,-51.8034,1393.69)">
                  <rect x="142.327" y="275.741" width="396.011" height="396.011" style="fill:none;" />
                  <g transform="matrix(0.495014,0,0,0.495007,3.15989,-102.548)">
                    <path d="M687.28,980.293L406.378,980.293L406.378,1438.97L865.059,1438.97L865.059,1159.34"
                      style="fill:none;stroke:black;stroke-width:22.22px;" />
                  </g>
                  <g transform="matrix(0.145129,0.145127,-0.145129,0.145127,656.851,-26.082)">
                    <path
                      d="M519.133,2352.46L519.133,2855.01L744,2855.01L744,2352.46L1108.68,2352.46L631.567,1875.35L154.455,2352.46L519.133,2352.46Z"
                      style="fill:none;stroke:black;stroke-width:53.6px;" />
                  </g>
                </g>
              </g>
            </svg>
          </a>
        </div>
        <div class="remove-user">
          <!-- アイコンは https://kotonohaworks.com/free-icons/gomibako/ 「線画のゴミ箱」を使用させていただきました。 -->
          <?xml version="1.0" encoding="UTF-8" standalone="no"?>
          <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
          <svg width="100%" height="100%" viewBox="0 0 800 800" version="1.1" xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/"
            style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-miterlimit:1;">
            <g transform="matrix(1,0,0,1,-235,-1950)">
              <g transform="matrix(2.02015,0,0,2.02017,-51.8034,1393.69)">
                <rect x="142.327" y="275.741" width="396.011" height="396.011" style="fill:none;" />
                <g transform="matrix(0.495014,0,0,0.495007,25.3959,-130.107)">
                  <path d="M635.719,1099.39L635.719,1460.39" style="fill:none;stroke:black;stroke-width:22.22px;" />
                </g>
                <g transform="matrix(0.495014,0,0,0.495007,78.6099,-130.107)">
                  <path d="M642.719,1099.39L625.719,1460.39" style="fill:none;stroke:black;stroke-width:22.22px;" />
                </g>
                <g transform="matrix(0.495014,0,0,0.495007,-27.8181,-130.107)">
                  <path d="M628.719,1099.39L645.719,1460.39" style="fill:none;stroke:black;stroke-width:22.22px;" />
                </g>
                <g transform="matrix(0.495014,0,0,0.495007,25.6434,-689.886)">
                  <rect x="360.468" y="2086.24" width="550.501" height="51"
                    style="fill:none;stroke:black;stroke-width:22.22px;stroke-linejoin:round;" />
                </g>
                <g>
                  <g transform="matrix(0.495014,0,0,0.495007,25.6434,-689.886)">
                    <path d="M568.3,2086.24L586.3,2035.24L649.3,2035.24"
                      style="fill:none;stroke:black;stroke-width:22.22px;stroke-linejoin:round;" />
                  </g>
                  <g transform="matrix(-0.495014,0,0,0.495007,654.608,-689.886)">
                    <path d="M568.3,2086.24L586.3,2035.24L649.3,2035.24"
                      style="fill:none;stroke:black;stroke-width:22.22px;stroke-linejoin:round;" />
                  </g>
                </g>
                <g transform="matrix(0.495014,0,0,0.495007,21.6662,-689.886)">
                  <path d="M415.587,2168.53L460.967,2666.24L829.3,2666.24L871.92,2168.53"
                    style="fill:none;stroke:black;stroke-width:22.22px;stroke-linejoin:round;" />
                </g>
              </g>
            </g>
          </svg>
        </div>
        <div class="purge-zombie">
          <!-- アイコンは https://icon-pit.com/pictogram/1661 「禁止マークのアイコン」を使用させていただきました。 -->
          <img src="../icons/purgeButton.png" alt="" class="purge-zombie-button">
        </div>
      </div>`;

    return element;
  }

  private get trimmedText(): string {
    // tweetが200文字以上の場合は...で省略する
    if (this.text.length > 200) {
      return this.text.substring(0, 200).concat("...");
    } else {
      return this.text;
    }
  }

  private get noHideURL(): string {
    const url = new URL(this.url);
    url.searchParams.append(zombieViewParam, this.id);
    return url.toString();
  }
}
