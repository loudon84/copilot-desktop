# Runtime Connection

Copilot Desktop connects to an existing local Hermes Agent instead of installing it.

## Boundary

Desktop owns login, local connection config, Gateway health, Chat, Sessions, Profile, MCP, and settings.

Hermes Agent owns install, upgrade, Python env, and model API keys. See [[src/shared/runtime/runtime-contract.ts]] for shared probe types.

## Path resolution

Runtime paths live outside the install module so Gateway and Chat stay decoupled.

[[src/main/runtime/hermes-runtime-paths.ts]] owns `HERMES_HOME` and derived paths so Gateway/Chat no longer import `installer.ts`.

## Adapter

The legacy local adapter probes an install and starts Gateway when stopped.

[[src/main/runtime/legacy-local-runtime-adapter.ts]] probes an existing install and calls [[src/main/hermes.ts#startGatewayWithRecovery]] when needed. [[src/main/runtime/runtime-manager.ts]] is the IPC facade.

## Startup

App splash connects local Runtime before main UI, or shows Connection Error.

[[src/renderer/src/App.tsx]] starts at splash, calls `runtimeEnsureLocalReady` for local mode, and routes to main or Connection Error. Remote and SSH skip local Runtime probe.
