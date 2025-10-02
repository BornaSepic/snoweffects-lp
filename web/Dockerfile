FROM node:20.18.0-bookworm as foundation

ENV NEXT_TELEMETRY_DISABLED=1 \
    NODE_ENV=development \
    SHELL=/bin/bash \
    TMP_DIR=/mnt/tmp \
    WORKDIR=/app

ENV PATH="${WORKDIR}/bin:${WORKDIR}/node_modules/.bin:${PATH}"

WORKDIR ${WORKDIR}

RUN echo "Configuring folder permissions" \
    && mkdir ${TMP_DIR} \
    && chown -R node:node ${TMP_DIR} ${WORKDIR}

RUN echo 'Installing dependencies' \
    && apt-get update \
    && apt-get --assume-yes --no-install-recommends install \
        fd-find \
        jq \
        parallel \
        tini \
    && echo 'Cleaning up' \
    && rm -rf /var/lib/apt/lists/* \
    && rm -rf /var/cache/apt

RUN echo "Installing pnpm" \
    && PNPM_VERSION='9.14.1' \
    && npm install -g "pnpm@${PNPM_VERSION}"

ENV npm_config_cache="${TMP_DIR}/npm-cache" \
    npm_config_store_dir="${TMP_DIR}/pnpm-store"

RUN echo "Installing tooling" \
    && echo "===================" \
    && echo "Installing babashka" \
    && BABASHKA_VERSION='1.3.190' \
    && ARCH= && dpkgArch="$(dpkg --print-architecture)" \
    && case "${dpkgArch##*-}" in \
      amd64) ARCH='amd64';; \
      arm64) ARCH='aarch64';; \
      *) echo "unsupported architecture -- ${dpkgArch##*-}"; exit 1 ;; \
    esac \
    && set -ex \
    && cd $TMP_DIR \
    && curl -fsSL --compressed --output bb.tar.gz \
      "https://github.com/babashka/babashka/releases/download/v${BABASHKA_VERSION}/babashka-${BABASHKA_VERSION}-linux-${ARCH}-static.tar.gz" \
    && curl -fsSL --output bb.tar.gz.sha256 \
      "https://github.com/babashka/babashka/releases/download/v${BABASHKA_VERSION}/babashka-${BABASHKA_VERSION}-linux-${ARCH}-static.tar.gz.sha256" \
    && echo "$(cat bb.tar.gz.sha256) bb.tar.gz" | sha256sum --check --status \
    && tar -xf ./bb.tar.gz \
    && cp -fv bb /usr/local/bin \
    && chmod +x /usr/local/bin/bb \
    && echo "Cleaning up" \
    && rm -rf ./bb* \
    && echo "==================" \
    && echo "Installing ripgrep" \
    && RIPGREP_VERSION='v13.0.0-4' \
    && ARCH= && dpkgArch="$(dpkg --print-architecture)" \
    && case "${dpkgArch##*-}" in \
      amd64) ARCH='x86_64-unknown-linux-musl';; \
      arm64) ARCH='aarch64-unknown-linux-musl';; \
      *) echo "unsupported architecture -- ${dpkgArch##*-}"; exit 1 ;; \
    esac \
    && set -ex \
    && cd $TMP_DIR \
    && curl -fsSLO --compressed "https://github.com/microsoft/ripgrep-prebuilt/releases/download/${RIPGREP_VERSION}/ripgrep-${RIPGREP_VERSION}-${ARCH}.tar.gz" \
    && tar -xf "./ripgrep-${RIPGREP_VERSION}-${ARCH}.tar.gz" \
    && cp -fv ./rg /usr/local/bin \
    && chmod +x /usr/local/bin/rg \
    && echo "Cleaning up" \
    && rm -rf ./ripgrep*

#### DEVELOPMENT
FROM foundation as development

RUN echo "Installing development tools" \
    && echo "Installing watchexec" \
    && WATCHEXEC_VERSION='1.23.0' \
    && ARCH= && dpkgArch="$(dpkg --print-architecture)" \
    && case "${dpkgArch##*-}" in \
      amd64) ARCH='x86_64-unknown-linux-musl';; \
      arm64) ARCH='aarch64-unknown-linux-musl';; \
      *) echo "unsupported architecture -- ${dpkgArch##*-}"; exit 1 ;; \
    esac \
    && set -ex \
    && cd $TMP_DIR \
    && curl -fsSLO --compressed "https://github.com/watchexec/watchexec/releases/download/v${WATCHEXEC_VERSION}/watchexec-${WATCHEXEC_VERSION}-${ARCH}.tar.xz" \
    && curl -fsSL "https://github.com/watchexec/watchexec/releases/download/v${WATCHEXEC_VERSION}/SHA512SUMS" | grep $ARCH | grep '.tar.xz' > watchexecsums \
    && sha512sum --check watchexecsums --status \
    && tar -xJf "./watchexec-${WATCHEXEC_VERSION}-${ARCH}.tar.xz" \
    && cp -fv "./watchexec-${WATCHEXEC_VERSION}-${ARCH}/watchexec" /usr/local/bin \
    && chmod +x /usr/local/bin/watchexec \
    && echo "Cleaning up" \
    && rm -rf ./watchexec* \
    && echo "===================" \
    && echo "Installing Hivemind" \
    && HIVEMIND_VERSION='1.0.6' \
    && ARCH= && dpkgArch="$(dpkg --print-architecture)" \
    && case "${dpkgArch##*-}" in \
      amd64) ARCH='amd64';; \
      arm64) ARCH='arm64';; \
      *) echo "unsupported architecture -- ${dpkgArch##*-}"; exit 1 ;; \
    esac \
    && set -ex \
    && cd $TMP_DIR \
    && curl -fsSLO --compressed "https://github.com/DarthSim/hivemind/releases/download/v${HIVEMIND_VERSION}/hivemind-v${HIVEMIND_VERSION}-linux-${ARCH}.gz" \
    && gunzip "./hivemind-v${HIVEMIND_VERSION}-linux-${ARCH}.gz" \
    && cp -fv "./hivemind-v${HIVEMIND_VERSION}-linux-${ARCH}" /usr/local/bin/hivemind \
    && chmod +x /usr/local/bin/hivemind \
    && echo "Cleaning up" \
    && rm -rf ./hivemind*

USER node

RUN echo "Customizing shell prompt" \
    && printf '\nexport PS1="[WEB]:\u@\h:\w\\$ "\n' >> ~/.bashrc \
    && echo 'Alias `yarn [script_name]` to `pnpm run [script_name]`' \
    && printf '\nyarn ()\n{\n  pnpm run -- $@\n}\n' >> ~/.bashrc \
    && echo 'Done'

ENTRYPOINT ["/usr/bin/tini", "-sg", "--"]

#### CI
FROM foundation as ci

USER node

COPY --chown=node:node .npmrc package.json pnpm-lock*.yaml ./
COPY --chown=node:node bin/ ./bin/
COPY --chown=node:node devops/ ./devops/

RUN echo 'Installing node modules' \
    && pnpm install --reporter=append-only

COPY --chown=node:node . .

ENTRYPOINT ["/usr/bin/tini", "-sg", "--"]
