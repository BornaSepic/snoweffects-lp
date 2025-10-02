FROM ruby:3.1.4-bookworm as foundation

ENV NODE_ENV=development \
    SHELL=/bin/bash \
    TMP_DIR=/mnt/tmp \
    GITDIR=/app \
    WORKDIR=/app/devops

ENV PATH="${WORKDIR}/bin:${WORKDIR}/node_modules/.bin:${PATH}"

WORKDIR ${WORKDIR}

RUN echo "Installing node" \
    && NODE_VERSION='20.11.0' \
    && ARCH= && dpkgArch="$(dpkg --print-architecture)" \
    && case "${dpkgArch##*-}" in \
      amd64) ARCH='x64';; \
      arm64) ARCH='arm64';; \
      *) echo "unsupported architecture -- ${dpkgArch##*-}"; exit 1 ;; \
    esac \
    # use pre-existing gpg directory, see https://github.com/nodejs/docker-node/pull/1895#issuecomment-1550389150
    && export GNUPGHOME="$(mktemp -d)" \
    # gpg keys listed at https://github.com/nodejs/node#release-keys
    && set -ex \
    && for key in \
      4ED778F539E3634C779C87C6D7062848A1AB005C \
      141F07595B7B3FFE74309A937405533BE57C7D57 \
      74F12602B6F1C4E913FAA37AD3A89613643B6201 \
      DD792F5973C6DE52C432CBDAC77ABFA00DDBF2B7 \
      61FC681DFB92A079F1685E77973F295594EC4689 \
      8FCCA13FEF1D0C2E91008E09770F7A9A5AE15600 \
      C4F0DFFF4E8C1A8236409D08E73BC641CC11F4C8 \
      890C08DB8579162FEE0DF9DB8BEAB4DFCF555EF4 \
      C82FA3AE1CBEDC6BE46B9360C43CEC45C17AB93C \
      108F52B48DB57BB0CC439B2997B01419BD92F80A \
      A363A499291CBBC940DD62E41F10027AF002F8B0 \
    ; do \
        gpg --batch --keyserver hkps://keys.openpgp.org --recv-keys "$key" || \
        gpg --batch --keyserver keyserver.ubuntu.com --recv-keys "$key" ; \
    done \
    && curl -fsSLO --compressed "https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-$ARCH.tar.xz" \
    && curl -fsSLO --compressed "https://nodejs.org/dist/v$NODE_VERSION/SHASUMS256.txt.asc" \
    && gpg --batch --decrypt --output SHASUMS256.txt SHASUMS256.txt.asc \
    && gpgconf --kill all \
    && rm -rf "$GNUPGHOME" \
    && grep " node-v$NODE_VERSION-linux-$ARCH.tar.xz\$" SHASUMS256.txt | sha256sum -c - \
    && tar -xJf "node-v$NODE_VERSION-linux-$ARCH.tar.xz" -C /usr/local --strip-components=1 --no-same-owner \
    && rm "node-v$NODE_VERSION-linux-$ARCH.tar.xz" SHASUMS256.txt.asc SHASUMS256.txt \
    && ln -s /usr/local/bin/node /usr/local/bin/nodejs \
    # smoke tests
    && node --version \
    && npm --version \
    && echo 'Done'

RUN echo 'Installing dependencies' \
    && apt-get update \
    && apt-get --assume-yes --no-install-recommends install \
        parallel \
        tini \
    && echo 'Cleaning up' \
    && rm -rf /var/lib/apt/lists/* \
    && rm -rf /var/cache/apt \
    && echo 'Done'

ENV npm_config_cache="${TMP_DIR}/npm-cache" \
    npm_config_store_dir="${TMP_DIR}/pnpm-store"

RUN echo "Installing pnpm" \
    && PNPM_VERSION='8.15.1' \
    && npm install -g "pnpm@${PNPM_VERSION}" \
    && echo 'Done'

ARG GROUP_ID=1000
ARG USER_ID=1000

RUN echo 'Creating "node" user' \
    && groupadd --gid $GROUP_ID node \
    && useradd --uid $USER_ID --gid node --shell /bin/bash --create-home node \
    && echo '==============================' \
    && echo 'Configuring folder permissions' \
    && if [ ! -d "$TMP_DIR" ] ; then mkdir "$TMP_DIR" ; fi \
    && chown -R node:node ${TMP_DIR} ${WORKDIR} \
    && echo 'Done'

#### DEVELOPMENT
FROM foundation as development

USER node

RUN echo "Customizing shell prompt" \
    && printf '\nexport PS1="[DEVOPS]:\u@\h:\w\\$ "\n' >> ~/.bashrc \
    && echo 'Alias `yarn [script_name]` to `pnpm run [script_name]`' \
    && printf '\nyarn ()\n{\n  pnpm run -- $@\n}\n' >> ~/.bashrc \
    && echo 'Done'

ENTRYPOINT ["tini", "-sg", "--"]

#### CONTINUOUS DELIVERY
FROM foundation as cd

USER node

ENTRYPOINT ["tini", "-sg", "--"]
